import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DateForm from './DateForm';
import TimeForm from './TimeForm';
import InformationForm from './InformationForm';
import ReviewForm from './ReviewForm';
import GlobalState from './GlobalState';
import AddressForm from './AddressForm';

import {BrowserView, MobileView} from 'react-device-detect';
import * as EmailValidator from 'email-validator';


import MobileStepper from './MobileStepper';
import PersonsBox from './PersonsBox';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="https://www.blood.london/">
            Blood.London. 
      </Link>{' '}
     
      All rights reserved
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#333",
    color: "#fff",
    alignItems: 'center'

  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Appoinment Date', 'Appoinment Time', 'Basic Info', 'Address Info' ,'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <DateForm />;
    case 1:
      return <TimeForm />;
    case 2:
      return <InformationForm />;
    case 3:
      return <AddressForm />;
    case 4:
        return <ReviewForm />;
    default:
      throw new Error('Unknown step');
  }
}



export default function Checkout() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;



  const ValidateStep = (step) =>
  {
    var error = false;

    if (step === 1)
    {
      /// Validate time
      
      if (!state.bookingTime)
      {
        setState(state => ({...state, bookingTimeError : true}));
        error = true;
      }
    } else if (step === 2){
      ///validate Basic Info
      if (!state.gender)
      {
        setState(state => ({...state, genderError : true}));
        error = true;
      }
      if (!state.title)
      {
        setState(state => ({...state, titleError : true}));
        error = true;
      }
      if (!state.firstname || state.firstname.trim().length < 3)
      {
        setState(state => ({...state, firstnameError : true}));
        error = true;
      }
      if (!state.lastname || state.lastname.trim().length < 3)
      {
        setState(state => ({...state, lastnameError : true}));
        error = true;
      }
      if (!state.birthDate)
      {
        setState(state => ({...state, birthDateError : true}));
        error = true;
      }
      if (!state.email || !EmailValidator.validate(state.email))
      {
        setState(state => ({...state, emailError : true}));
        error = true;
      }
    }
    else if (step === 3){
      ///validate Address Info
      if (!state.phone || state.phone.trim().length < 6)
      {
        setState(state => ({...state, phoneError : true}));
        error = true;
      }
      if (!state.postCode || state.postCode.trim().length < 5)
      {
        setState(state => ({...state, postCodeError : true}));
        error = true;
      }
      if (!state.address || state.address.trim().length < 10)
      {
        setState(state => ({...state, addressError : true}));
        error = true;
      }    
      if (state.certificate && (!state.passportNumber || state.passportNumber.trim().length < 6))
      {
        setState(state => ({...state, passportNumberError : true}));
        error = true;
      }
    }

      return !error;   
  }


  const addAnotherPerson = () => {
    if (ValidateStep(activeStep))
    {
      const personInfo = {
        gender: state.gender,
        title: state.title,
        firstname: state.firstname,
        lastname: state.lastname,
        birthDate: state.birthDate,
        email: state.email,
        phone: state.phone,
        postCode: state.postCode,
        address: state.address,
        notes: state.notes,
        certificate: state.certificate,
        passportNumber: state.passportNumber
      }
        var newPersons = state.persons;
        newPersons.push(personInfo);
        setState(state => ({bookingDate: state.bookingDate, 
          bookingTime: state.bookingTime,
          persons: newPersons
        }));
      
      setActiveStep(2);
    }

  };

  const handleNext = () => {
      if (ValidateStep(activeStep))
      {
          setActiveStep(activeStep + 1);
      }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
            {/* <img src="logo.png" alt="logo" className={classes.logo} /> */}
          <Typography variant="h4" color="inherit" noWrap>
                 Medical Express Clinic
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
                Book Appointment Online
          </Typography>

      

          <React.Fragment>
              {activeStep < steps.length ? (
                  <React.Fragment>
                        <BrowserView>
                                <Stepper activeStep={activeStep} className={classes.stepper}>
                                    {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                    ))}
                                </Stepper>
                        </BrowserView>

                        <MobileView>
                                    <MobileStepper 
                                            steps={maxSteps}
                                            position="static"
                                            variant="progress"
                                            
                                            activeStep={activeStep}
                                    />
                        </MobileView>  
                  </React.Fragment>
              ) : (
                  <React.Fragment>

                      
                  </React.Fragment>
              )}
          </React.Fragment>                  

          {/* <PersonsBox/> */}

          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                  
                  {activeStep === 3 && (!state.persons || (state.persons && state.persons.length < 4)) && (
                    <Button 
                            variant="contained"
                            color="primary"
                            onClick={addAnotherPerson} className={classes.button}>
                      Add Another Person
                    </Button>
                  )}


                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}