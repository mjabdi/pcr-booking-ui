import React from 'react';
import Typography from '@material-ui/core/Typography';

import GlobalState from './GlobalState';
import { makeStyles , useTheme} from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import TimeService from './services/TimeService';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button'
// import { Mouse, Satellite } from '@material-ui/icons';
// import { BrowserView } from 'react-device-detect';

var timeSlots = null;

const useStyles = makeStyles((theme) => ({
    
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        // width: 500,
        // height: 450,
      },

      box: {
        //backgroundColor: "red",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#555",
        cursor: "pointer",
        "&:hover": {
            background: "green",
            color: "#fff"
          },
      },

      boxSelected: {
        backgroundColor: "green",
        border: "1px solid #999",
        margin: "5px",
        padding: "5px",
        color: "#fff",
        cursor: "pointer",
      },

      boxDisable: {
        backgroundColor: "#999",
        border: "1px solid #ddd",
        margin: "5px",
        padding: "5px",
        color: "#fff"
        
      },

  }));

  function LoadData(date, callback){

    const promise1 = TimeService.getTimeSlots(date);

    Promise.all([promise1]).then( (values) => {

      timeSlots = values[0];

      callback(true);

    }).catch( (err) =>
    {
      console.log(err);
    });
}

export default function TimeForm() {
    const classes = useStyles();
    // const theme = useTheme();

    const [state, setState] = React.useContext(GlobalState);
    const [bookingTime, setTime] = React.useState(state.bookingTime ?? '');

    const [dataLoaded, setDataLoaded] =  React.useState(false);

    const emptyTimeSlots = [];
    for (var i=0; i<28; i++)
    {
      emptyTimeSlots.push(i);
    }

    LoadData(state.bookingDate, setDataLoaded);

    const boxClicked = (key) =>
    {
        if (key)
        {
            setTime(key);
            setState({...state, bookingTime : key});
        }

    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Pick a Time
      </Typography>

      {dataLoaded ?  (
            
            <React.Fragment>
                <div className={classes.root}>
                        <GridList cellHeight={60} className={classes.gridList} cols={4}>
                          {timeSlots.map((timeSlot) => (
                            <GridListTile key={timeSlot.time} cols={1}>
                              <div 
                                  onClick= {() => {timeSlot.available? boxClicked(timeSlot.time) : boxClicked(null)}}
                                  className={(timeSlot.available) ? ((bookingTime === timeSlot.time)? classes.boxSelected : classes.box ): classes.boxDisable}>
                                  {timeSlot.time}
                              </div>
                            </GridListTile>
                          ))}
                        </GridList>
                </div>
            </React.Fragment>
      ) : (
        <React.Fragment>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  >
                      <GridList cellHeight={60} className={classes.gridList} cols={4}>
                          {emptyTimeSlots.map((timeSlot) => (
                            <GridListTile key={timeSlot} cols={1}>
                                 <Skeleton variant="rect" width={120}  height={35} />
                            </GridListTile>
                          ))}
                        </GridList>
                  </Grid>

    </React.Fragment>

      ) }



    </React.Fragment>
  );
}

const checkFullyBooked = (time) =>
{
    return false;
}
