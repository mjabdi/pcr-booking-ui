import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GlobalState from './GlobalState';
import PersonsBox from './PersonsBox';

const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: "justify",
    },

    FormTitle:
    {
      marginTop : "20px",
      marginBottom : "20px",
    }

  }));

export default function AddressForm() {
    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
 
    const [phone, setPhone] = React.useState(state.phone ?? '');
    const [postCode, setPostCode] = React.useState(state.postCode ?? '');
    const [address, setAddress] = React.useState(state.address ?? '');
    const [notes, setNotes] = React.useState(state.notes ?? '');
    const [passportNumber, setPassportNumber] = React.useState(state.passportNumber ?? '');


    const [certificate, setCertificate] = React.useState(state.certificate ?? false);


    const certificateChanged = (event) => {
            setCertificate(event.target.checked);
            setState(state => ({...state, certificate: event.target.checked}));
        };



    const phoneChanged = (event) =>
    {
        setPhone(event.target.value);
        setState(state => ({...state, phone : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 6)
        {
          setState(state => ({...state, phoneError : false}));
        } 
    }

    const postCodeChanged = (event) =>
    {
        setPostCode(event.target.value);
        setState(state => ({...state, postCode : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 5)
        {
          setState(state => ({...state, postCodeError : false}));
        }
    }

    const addressChanged = (event) =>
    {
        setAddress(event.target.value);
        setState(state => ({...state, address : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 10)
        {
          setState(state => ({...state, addressError : false}));
        }
    }

    const notesChanged = (event) =>
    {
        setNotes(event.target.value);
        setState(state => ({...state, notes : event.target.value }));
    }

    const passportNumberChanged = (event) =>
    {
        setPassportNumber(event.target.value);
        setState(state => ({...state, passportNumber : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 6)
        {
          setState(state => ({...state, passportNumberError : false}));
        }
    }


  return (
    <React.Fragment>

      <PersonsBox/>

      {state.persons.length === 0 &&
          <Typography className={classes.FormTitle} variant="h6" gutterBottom>
              Fill Your Address Info
          </Typography>
       }

      {state.persons.length > 0 &&
            <Typography className={classes.FormTitle} variant="h6" gutterBottom>
                Fill Address Info
            </Typography>
      }


  

      <Grid container spacing={3} alignItems="baseline">
        <Grid item xs={12} md={6}>
             <TextField 
                        error={state.phoneError ? true : false}
                        required id="phone" label="Phone Number" 
                        fullWidth autoComplete="tel" 
                        value = {phone}
                        onChange = {phoneChanged} 
             />  
        </Grid>
        <Grid item xs={12} md={6}>
             <TextField 
                        error={state.postCodeError ? true : false}
                        required id="postCode" label="Postal Code" 
                        fullWidth autoComplete="postal-code"
                        value = {postCode}
                        onChange = {postCodeChanged} 
             />  
        </Grid>
        <Grid item xs={12}>
             <TextField 
                        error={state.addressError ? true : false}
                        required id="address" label="Address" 
                        multiline rowsMax={2} 
                        fullWidth autoComplete="street-address" 
                        value = {address}
                        onChange = {addressChanged} 
             />  
        </Grid>
        <Grid item xs={12}>
             <TextField 
                placeholder={`Must include flight date & flight time also If there's anything you want to tell the doctor beforehand, enter it here`} 
                id="notes"
                label="Notes" 
                helperText={`MUST include flight date & flight time`} 
                multiline rowsMax={2} rows={2} fullWidth autoComplete=""
                value = {notes}
                onChange = {notesChanged} 
            />  
        </Grid>
        <Grid item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl} 
            control={<Checkbox className={classes.formControl}  color="secondary" name="certificate" checked={certificate} onChange={certificateChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`I also require a medical certificate signed by a doctor declaring me 'fit-to-fly'.`} </span>}
          />
        </Grid>
        <Grid item xs={12} hidden={!certificate} >
             <TextField 
                        error={state.passportNumberError ? true : false}
                        required id="passport" label="Passport Number" 
                        helperText="your passport number will be noted on your certificate" 
                        fullWidth autoComplete="" 
                        value = {passportNumber}
                        onChange = {passportNumberChanged} 
             />  
        </Grid>
      </Grid>
    
      
    </React.Fragment>
  );
}

