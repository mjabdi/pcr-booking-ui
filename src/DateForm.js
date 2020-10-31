import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    DatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import GlobalState from './GlobalState';
import {BrowserView, MobileView} from 'react-device-detect';

import TimeService from './services/TimeService';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

var firstAvailableDay = null;
var fullyBookedDays = [];

const useStyles = makeStyles((theme) => ({

  loadingBox: {
    
  }

}));


function LoadData(callback){

      const promise1 = TimeService.getFirstAvailableDay();
      const promise2 = TimeService.getFullyBookedDays();

      Promise.all([promise1, promise2]).then( (values) => {

        firstAvailableDay = new Date((values[0].data).date);
        fullyBookedDays = values[1];

        callback(true);

      }).catch( (err) =>
      {
        console.log(err);
      });
}


export default function DateForm() {
   const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);
    const [bookingDate, handleDateChange] = React.useState(state.bookingDate ?? new Date());

    const [dataLoaded, setDataLoaded] =  React.useState(false);

    LoadData(setDataLoaded);

    const dateChanged = (date) =>
    {
        handleDateChange(date);
        setState(state => ({...state, bookingDate: date}));
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
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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



const checkFullyBooked = (date) =>
{
    if (date.setHours(0,0,0,0) < firstAvailableDay.setHours(0,0,0,0))
    {
      return true;
    }

    else if (fullyBookedDays && fullyBookedDays.length > 0)
    {
      var result = false;
      fullyBookedDays.forEach( (value, index) => {

        if (EquallDates(value,date))
        {
          result = true;
        }
      });
      return result;
    }
    else
    {
      return false;
    }
}

function EquallDates(date1, date2)
{
   return (
           date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
   );      
}
