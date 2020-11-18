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
import BookService from './services/BookService';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import HttpsIcon from '@material-ui/icons/Https';

import {BrowserView, MobileView, isMobile} from 'react-device-detect';

import ValidateStep from './Validation';


import MobileStepper from './MobileStepper';

import logoImage from './images/logo.png';
import { Grid } from '@material-ui/core';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ResultsForm from './ResultsForm';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
           <strong> Medical Express Clinic </strong> 
      </Link>{isMobile ? ' ' : ' All rights reserved.' }
   
       
 
     
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: "#fff",
    color: "#00a1c5",
    alignItems: 'center',
  },

  logo: {
    maxWidth: 160,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
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

  bold: {
    fontWeight: "800",
    padding: "5px"
  },

  doneImage: {
    width: "240px",
    height: "150px",
    margin: "20px"
  },

  logoImage: {
    width: "40px",
    height: "40px",
    marginLeft: "0px",
    
  },

  privacyButton: {
    marginBottom : "20px"
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));

const steps = ['Appoinment Date', 'Appoinment Time', 'Basic Info', 'Address Info','Review'];

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


  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);



  /////****************** */




 // const [activeStep, setActiveStep] = React.useState(0);
 
 const setActiveStep = (step) => {
  setState(state => ({...state, activeStep : step}));
 }

  const [submiting, setSubmiting] = React.useState(false);


  const maxSteps = steps.length;



  

  const submitForm = () =>
  {

    var promiseArray = [];

    BookService.getNewReference().then( (res) => {

      const ref = res.data.ref;

      setState(state => ({...state, ref: ref}));

      if (!state.proceedToSubmit)
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
          passportNumber: state.passportNumber,
          passportNumber2: state.passportNumber2,
          antiBodyTest: state.antiBodyTest ?? false
        };
    
        const promise = BookService.bookAppointment({...personInfo, bookingDate: state.bookingDate, bookingTime: state.bookingTime, bookingRef: ref});
        promiseArray.push(promise);
      }
  
      for (var i=0 ; i < state.persons?.length; i++){
        promiseArray.push(BookService.bookAppointment({...state.persons[i],bookingDate: state.bookingDate, bookingTime: state.bookingTime, bookingRef: ref }));
      }
      
      Promise.all(promiseArray).then( (values) => {

        setState(state => ({...state, finalResults: values}));

        setSubmiting(false);
        setActiveStep(state.activeStep + 1);
  
      }).catch( (errs) =>
      {
        console.log(`Error :  ${errs}`);
        setSubmiting(false);
      });

    }).catch( (err) =>
    {
      console.log(`Cannot Get REF NO. : ${err}`);
      setSubmiting(false);
    });;
  }

  const proceedToSubmit = () =>
  {
    setState(state => ({...state, proceedToSubmit: true}));
    setActiveStep(4);
  }


  const handleNext = () => {

    if (state.activeStep === 4)
    {
      if (!state.dataConfirmed)
      {
        setState(state => ({...state, dataConfirmedError : true }));
        return;
      }
  

      setSubmiting(true);
      submitForm();

    }else if (ValidateStep(state, setState, state.activeStep)) {
    
        setActiveStep(state.activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(state.activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>


        <Grid
            container
            direction="row"
            spacing= {1}
            justify="center"
            alignItems="center"
        >


            <Grid item item xs={10}>
                  <Typography  style={{fontWeight: "400"}} variant="h6" color="inherit" noWrap>
                    Medical Express Clinic
                  </Typography>
            </Grid>

            <Grid item xs={2}>
                    <img className={classes.logoImage} src={logoImage} alt="logo image"/> 
            </Grid>

        </Grid>  
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>


          <Typography component="h1" variant="h6" align="center">
                Book Appointment Online
          </Typography>

      

          <React.Fragment>
              {state.activeStep < steps.length ? (
                  <React.Fragment>
                        <BrowserView>
                                <Stepper activeStep={state.activeStep} className={classes.stepper}>
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
                                            
                                            activeStep={state.activeStep}
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
            {state.activeStep === steps.length ? (

              <ResultsForm/>

            ) : (
              <React.Fragment>
                {getStepContent(state.activeStep)}
                <div className={classes.buttons}>
                  {state.activeStep !== 0 && (
                    <Button disabled={submiting} onClick={handleBack} onTouchTap = {handleBack}  className={classes.button}>
                      Back
                    </Button>
                  )}

                  {((state.activeStep === 2 || state.activeStep === 3 ) && state.persons && state.persons.length >= 1) && (
                    <Button 
                            // variant="contained"
                            color="secondary"
                            onTouchTap = {proceedToSubmit} 
                            onClick={proceedToSubmit} className={classes.button}>
                      Skip to Submit
                    </Button>
                  )}

                  <Button
                    disabled={submiting} 
                    variant="contained"
                    color="primary"
                    onTouchTap = {handleNext} 
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {state.activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                  




                </div>
              </React.Fragment>
            )}
          </React.Fragment>

        </Paper>

        <Button 
                  variant="contained" 
                  className={classes.privacyButton} 
                  color="secondary"
                  startIcon={<HttpsIcon/>}
                  onClick={handleClickOpen('paper')}
                  onTouchTap={handleClickOpen('paper')} 
                  >
             Privacy
         </Button>
         <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                      >
                        <DialogTitle id="scroll-dialog-title">Application Disclaimer</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                          <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                          >
                            <div style={{textAlign:"justify", padding:"10px"}}>
                              Medical Express Clinic will not contact you for any other reason than to share your test results, and certificate if selected, via the email address provided. The information provided to us via this registration form is never shared with any other organisations, except when this is required by law. 

                                Information provided will never be used for marketing purposes, you cannot opt in.

                                In the case of a positive swab result, our doctor will call on the telephone number provided to inform you of your result and provide additional advice or guidance.
                          </div>
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Close
                          </Button>
                      
                        </DialogActions>
      </Dialog>

      <Backdrop className={classes.backdrop} open={submiting} >
        <CircularProgress color="inherit" />
      </Backdrop>


        <Copyright />
      </main>
    </React.Fragment>
  );
}