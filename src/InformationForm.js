import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import GlobalState from './GlobalState';
import * as EmailValidator from 'email-validator';

import {
    DatePicker,
    KeyboardDatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PersonsBox from './PersonsBox';
import { Checkbox, FormControlLabel } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: "left"
    },

    FormTitle:
    {
      marginTop : "20px",
      marginBottom : "20px",
    }

  }));

export default function InformationForm() {
    const classes = useStyles();
    const [state, setState] = React.useContext(GlobalState);
    const [birthDate, handleBirthDateChange] = React.useState(state.birthDate ?? null);
    const [firstname, setFirstname] = React.useState(state.firstname ?? '');
    const [lastname, setLastname] = React.useState(state.lastname ?? '');
    const [email, setEmail] = React.useState(state.email ?? '');
    
    const [gender, setGender] = React.useState(state.gender ?? '');
    const [title, setTitle] = React.useState(state.title ?? '');

    const [emailConfirmed, setEmailConfirmed] = React.useState(state.emailConfirmed ?? false);

    const emailConfirmedChanged = (event) => {
      setEmailConfirmed(event.target.checked);
      setState(state => ({...state, emailConfirmed: event.target.checked}));
      setState(state => ({...state, emailConfirmedError: false}));
  };

    const titleChanged = (event) => {
            setTitle(event.target.value);
            setState(state => ({...state, title: event.target.value}));
            setState(state => ({...state, titleError : false}));
        };

    const genderChanged = (event) => {
            setGender(event.target.value);
            setState(state => ({...state, gender: event.target.value}));
            setState(state => ({...state, genderError : false}));
        };

    const birthDateChanged = (date) =>
    {
        handleBirthDateChange(date);
        setState(state => ({...state, birthDate: date}));
        setState(state => ({...state, birthDateError : false}));
    }  

    const firstnameChanged = (event) =>
    {
        setFirstname(event.target.value);
        setState(state => ({...state, firstname : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 3)
        {
          setState(state => ({...state, firstnameError : false}));
        }
    }

    const lastnameChanged = (event) =>
    {
        setLastname(event.target.value);
        setState(state => ({...state, lastname : event.target.value }));
        if (event.target.value && event.target.value.trim().length >= 3)
        {
          setState(state => ({...state, lastnameError : false}));
        }
    }

    const emailChanged = (event) =>
    {
        setEmail(event.target.value);
        setState(state => ({...state, email : event.target.value }));
        if (event.target.value && EmailValidator.validate(event.target.value))
        {
          setState(state => ({...state, emailError : false}));
        }
    }

  return (


    <React.Fragment>

      <PersonsBox/>

    {state.persons.length === 0 &&
          <Typography className={classes.FormTitle} variant="h6" gutterBottom>
              Fill Your Basic Info
          </Typography>
    }

    {state.persons.length > 0 &&
          <Typography className={classes.FormTitle} variant="h6" gutterBottom>
              Fill Basic Info
          </Typography>
    }

      
   

      <Grid container spacing={3} alignItems="baseline">

      <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="gender-label-id">Gender</InputLabel>
                <Select
                    error={state.genderError ? true : false}
                    fullWidth
                    labelId="gender-label-id"
                    id="gender-id"
                    value={gender}
                    onChange={genderChanged}
                >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
            <FormControl className={classes.formControl} fullWidth required>
                <InputLabel id="title-label-id">Title</InputLabel>
                <Select
                    error={state.titleError ? true : false}
                    fullWidth
                    labelId="title-label-id"
                    id="title-id"
                    value={title}
                    onChange={titleChanged}
                >
                    <MenuItem value={'Mr'}>Mr</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs</MenuItem>
                    <MenuItem value={'Miss'}>Miss</MenuItem>
                    <MenuItem value={'Ms'}>Ms</MenuItem>
                    <MenuItem value={'Dr'}>Dr</MenuItem>
                </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
                    error={state.firstnameError ? true : false}
                    required id="firstName" label="First Name" 
                    fullWidth autoComplete="given-name" 
                    value = {firstname}
                    onChange = {firstnameChanged} 
          />
        </Grid>
        <Grid item xs={12} md={6}>
         <TextField 
                    error={state.lastnameError ? true : false}
                    required id="lastName" label="Last Name" 
                    fullWidth autoComplete="family-name" 
                    value = {lastname}
                    onChange = {lastnameChanged} 
        />  
        </Grid>
        <Grid item xs={12} md={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker  
                        error={state.birthDateError ? true : false}
                        autoOk
                        fullWidth
                        variant="inline"
                        label="Birthdate"
                        format="dd/MM/yyyy"
                        disableFuture
                        InputAdornmentProps={{ position: "start" }}
                        helperText="dd/MM/yyyy"
                        value={birthDate}
                        onChange={birthDateChanged}
                        />
             </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={6}>
             <TextField
                        error={state.emailError ? true : false}
                        required id="email" label="Email Address" 
                        fullWidth autoComplete="email"  type="email"
                        value = {email}
                        onChange = {emailChanged} 
                        helperText = 'This email address is where you will receive your results. Please tick the box below to confirm that this is a private email address to which you are happy for us to send your results.'
             />  
        </Grid>

        <Grid item xs={12} className={classes.formControl} >
          <FormControlLabel className={classes.formControl}  style={ {color: state.emailConfirmedError ? "red" : ''}} 
            control={<Checkbox className={classes.formControl} style={ {color: state.emailConfirmedError ? "red" : ''}}  color="secondary" name="emailConfirmCheckBox" checked={emailConfirmed} onChange={emailConfirmedChanged} />}
             label={<span style={{ fontSize: '0.8rem' }}>{`I confirm that this is a private email address to which I am happy for you to send my results.`} </span>}
          />
        </Grid>

     
      </Grid>
    
      
    </React.Fragment>
  );
}

