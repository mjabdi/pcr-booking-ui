import React from 'react';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import {BrowserView, MobileView} from 'react-device-detect';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  formControl: {
    marginTop : theme.spacing(4),
    marginBottom : theme.spacing(4),
    padding: theme.spacing(1),
    
  }

}));


export default function AntiBodyForm() {
   const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);
    const [antiBodyCheck, setAntiBodyCheck] = React.useState(state.antiBodyTest ?? false);

    const antiBodyCheckChanged = (event) =>
    {
      setAntiBodyCheck(event.target.checked);
      setState(state => ({...state, antiBodyTest : event.target.checked}));
    }

  return (

    <React.Fragment>
               
                <Typography variant="h6" gutterBottom>
                    Add to your Appointment...
                </Typography>

        <Grid container spacing={3} alignItems="baseline">

            <Grid item xs={12} className={classes.formControl} >
                <FormControlLabel className={classes.formControl} 
                  control={<Checkbox className={classes.formControl}  color="secondary" name="emailConfirmCheckBox" checked={antiBodyCheck} onChange={antiBodyCheckChanged} />}
                  label={<span style={{ fontSize: '1.1rem' }}>{`COVID-19 Antibody Test (IgM & IgG)`} 
                  <span  style={{ fontSize: '1.2rem', textDecoration: "italic" ,fontWeight:"600" ,color:"#333" }}> £99.00 </span> </span> }
                  
                
                />
            </Grid>

        </Grid>


     
    </React.Fragment>
  );
}



