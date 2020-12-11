import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';

import GlobalState from './GlobalState';
import {BrowserView, MobileView} from 'react-device-detect';

import TimeService from './services/TimeService';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';


import { format, addMinutes } from 'date-fns';

class UTCUtils extends DateFnsUtils {
  format(date, formatString) {
    return format(addMinutes(date, date.getTimezoneOffset()), formatString);
  }
}



const useStyles = makeStyles((theme) => ({

  loadingBox: {
    
  }

}));




export default function DateForm() {
   const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);
    const [bookingDate, setBookingDate] = React.useState(state.bookingDate ?? new Date());

    const [firstAvailableDay, setFirstAvailableDay] = React.useState(new Date());
    const [fullyBookedDays, setFullyBookedDays] = React.useState(null);

    const [dataLoaded, setDataLoaded] =  React.useState(false);

    useEffect(() => {
      window.scrollTo(0, 0)
    }, []);

    const LoadData = () => {

      const promise1 = TimeService.getFirstAvailableDate();
      const promise2 = TimeService.getFullyBookedDates();

      Promise.all([promise1, promise2]).then( (values) => {

        setFirstAvailableDay(new Date((values[0].data).date));
        setFullyBookedDays(values[1].data);

        setDataLoaded(true);

      }).catch( (err) =>
      {
        console.log(err);
      });
}



    useEffect(() => {

      dateChanged(state.bookingDate ?? new Date());

      LoadData();

    },[]);

    const dateChanged = (date) =>
    {
        //date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);
        // const offset = parseInt(date.getTimezoneOffset());
        // console.log(offset);

        // date = new Date(date.getTime() + (offset * 60 * 1000));
        
        // date = format(date, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/London' }) ; // 2014-10-25 10:46:20 GMT 00
        // date = toDate(date);
        console.log(date);
        setBookingDate(date);
        setState(state => ({...state, bookingDate: date}));
    }

  const checkFullyBooked = (date) =>
  {
    // date = new Date(date.getFullYear(), date.getMonth(), date.getDate(),0,0,0,0);
    // date = format(date, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Europe/London' }) ; // 2014-10-25 10:46:20 GMT 00
    var result = false;

    if (date.setHours(0,0,0,0) < firstAvailableDay.setHours(0,0,0,0))
    {
       result = true;
    }

    else if (fullyBookedDays && fullyBookedDays.length > 0)
    {
     

      for (var i=0 ; i < fullyBookedDays.length ; i++ )
      {
        if (new Date(fullyBookedDays[i]).setHours(0,0,0,0) === date.setHours(0,0,0,0))
        {
          result = true;
        }
      }

      return result;
    }
    else
    {
      return false;
    }
}

  return (

    <React.Fragment>
               
                <Typography variant="h6" gutterBottom>
                    Pick a Date
                </Typography>

        {dataLoaded ?  (
            
                <React.Fragment>

                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >

                        <BrowserView>
                            <MuiPickersUtilsProvider utils={UTCUtils}>
                                    <DatePicker autoOk 
                                                disablePast="true" 
                                                openTo="date"
                                                orientation="landscape" 
                                                variant="static" 
                                                fullWidth
                                                value={bookingDate} 
                                                onChange={dateChanged} 
                                                shouldDisableDate={checkFullyBooked}
                                                />
                            </MuiPickersUtilsProvider>
                        </BrowserView>

                        <MobileView>
                            <MuiPickersUtilsProvider utils={UTCUtils}>
                                        <DatePicker autoOk 
                                                    disablePast="true" 
                                                    openTo="date"
                                                    variant="static" 
                                                    fullWidth
                                                    value={bookingDate} 
                                                    onChange={dateChanged} 
                                                    shouldDisableDate={checkFullyBooked}
                                                    />
                                </MuiPickersUtilsProvider>
                        </MobileView>
                </Grid>

              </React.Fragment>
              )
            : 
            (
            <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >

                      <Skeleton variant="text" width={'80%'} />
                      <Skeleton variant="text" width={'80%'}  />
                      <Skeleton variant="rect" width={'80%'}  height={220} />

                  </Grid>
            </React.Fragment>
            )
          }
    </React.Fragment>
  );
}





function EquallDates(date1, date2)
{
   return (
           date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
   );      
}
