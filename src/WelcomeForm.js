import React, { useEffect } from 'react';
import { lighten, makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import HttpsIcon from '@material-ui/icons/Https';

import { BrowserView, MobileView, isMobile } from 'react-device-detect';

import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import { Grid } from '@material-ui/core';

import logoImage from './images/logo.png';

import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import faq from './FAQ';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
        <strong> Medical Express Clinic </strong>
      </Link>{isMobile ? ' ' : ' All rights reserved.'}




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
    marginBottom: "20px",
    width: "115px"
  },

  faqButton: {
    marginBottom: "20px",
    marginLeft: "10px",
    backgroundColor: "#2f942e",
    "&:hover": {
      background: "green",
      color: "#fff"
    },
    textDecoration: "none !important",
    width: "115px"

  },

  textContent: {
    color: "#555",
    fontSize: "1.1rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight: "400"
  },

  textContentMobile: {
    color: "#555",
    fontSize: "0.9rem",
    textAlign: "justify",
    paddingLeft: "30px",
    paddingRight: "30px",
    lineHeight: "2.2em",
    fontWeight: "400"
  },

  getStartedButton: {
    marginTop: "10px",
    marginBottom: "10px",

  },

  AirIcon: {
    marginRight: "10px",
    fontSize: "32px"
  },

  UList: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "grid",
    gridGap: "1rem",
  }

}));




export default function WelcomeForm() {
  const [state, setState] = React.useContext(GlobalState);
  const classes = useStyles();


  //// ** Dialog

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [scrollFAQ, setScrollFAQ] = React.useState('paper');

  const descriptionElementRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const descriptionElementRefFAQ = React.useRef(null);
  React.useEffect(() => {
    if (openFAQ) {
      const { current: descriptionElementFAQ } = descriptionElementRefFAQ;
      if (descriptionElementFAQ !== null) {
        descriptionElementFAQ.focus();
      }
    }
  }, [openFAQ]);


  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClickOpenFAQ = (scrollType) => () => {
    setOpenFAQ(true);
    setScrollFAQ(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFAQ = () => {
    setOpenFAQ(false);
  };


  const getStartedClicked = (event) => {
    setState(state => ({ ...state, getStarted: true }));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
          >
            <Grid item item xs={10}>
              <Typography
                style={{ fontWeight: "400" }}
                variant="h6"
                color="inherit"
                noWrap
              >
                Medical Express Clinic
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <img
                className={classes.logoImage}
                src={logoImage}
                alt="logo image"
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>

          {state.firstname && state.firstname.length > 0 && (
            <div style={{ textAlign: 'center', fontSize: "1rem", marginBottom: "10px", color: "#777", backgroundColor: "#f7fbff", padding: "20px" }}>
              Welcome back <span style={{ fontWeight: "500", color: "#333", fontStyle: "italic" }}>{state.firstname}</span>
            </div>
          )}

          <Typography
            style={{ fontWeight: 700, marginBottom: "50px" }}
            component="h1"
            variant="h6"
            align="center"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AirplanemodeActiveIcon
                className={classes.AirIcon}
                color="primary"
              />
              RT-PCR Fit to Fly Test - £199
            </div>
          </Typography>

          <ul className={classes.UList}>

         

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Universally accepted for international travel to all destinations - please check to make sure your destination country requires a PCR test prior to entry.

          </li>

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Nasopharyngeal swab sample taken from the back of the nose and throat.
          </li>

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Fully UKAS Accredited COVID-19 PCR test to detect viral RNA.
          </li>

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Guaranteed results within 48 hours - over 90% of our results return before 24 hours of clinic appointment. Test timing requirements differ from country to country, so please check your requirements carefully.
          </li>

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Secure, verifiable results sent in PDF format via email, hard copies available to collect.
          </li>

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            No card details or payment necessary.
          </li>

          <li
            className={
              isMobile ? classes.textContentMobile : classes.textContent
            }
          >
            Plans change and you may need to cancel or rearrange your appointment. We take payment for your test only when you attend the clinic.
          </li>

          </ul>

          <Button
            variant="contained"
            className={classes.getStartedButton}
            color="primary"
            onClick={getStartedClicked}
            onTouchTap={getStartedClicked}
          >
            Get Started
          </Button>
        </Paper>

        <Button
          variant="contained"
          className={classes.privacyButton}
          color="secondary"
          startIcon={<HttpsIcon />}
          onClick={handleClickOpen("paper")}
          onTouchTap={handleClickOpen("paper")}
        >
          Privacy
        </Button>

        <Button
          variant="contained"
          className={classes.faqButton}
          color="secondary"
          startIcon={<LiveHelpIcon />}
          onClick={handleClickOpenFAQ("paper")}
          onTouchTap={handleClickOpenFAQ("paper")}
        >
          FAQ
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            PRIVACY NOTICE
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div style={{ textAlign: "justify", padding: "0px", color: "#333" }}>
                <p>
                  Medical Express Clinic collects and holds the personal data of patients registered at the clinic so as to provide safe and effective ongoing care for our patients.
                </p>
                <p>
                  Medical records are kept confidentially and securely under lock and key or securely on our server. They are primarily used for the safe and effective delivery of care.
                </p>
                <p>
                  Your medical record may be subject to clinical audit and management review in order for Medical Express Clinic to maintain and improve our provision of care.
                </p>
                <p>
                  Please review our Patient Information handout, given to you prior to registration for more information.
                </p>
                <p>
                  If you would like to review a full copy of our Privacy and Decency Policy, please ask at reception.
                </p>
                <p>
                  Thank you
                </p>
                <p>
                  Medical Express Clinic
                </p>

              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openFAQ}
          onClose={handleCloseFAQ}
          scroll={scrollFAQ}
          aria-labelledby="scroll-dialog-title-FAQ"
          aria-describedby="scroll-dialog-description-FAQ"
        >
          <DialogTitle id="scroll-dialog-title">FAQ</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description-FAQ"
              ref={descriptionElementRefFAQ}
              tabIndex={-1}
            >
              <div style={{ textAlign: "justify", padding: "10px" }}>
                {faq.map((element) => (
                  <React.Fragment>
                    <p
                      style={{
                        borderLeft: "4px solid red",
                        background: "#eee",
                        fontWeight: "600",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        lineHeight: "30px",
                      }}
                    >
                      <span style={{ color: "red", fontSize: "24px" }}>
                        {" "}
                        Q.{" "}
                      </span>
                      {element.question}
                    </p>

                    <p
                      style={{
                        borderLeft: "4px solid #999",
                        background: "#fff",
                        fontWeight: "400",
                        color: "#555",
                        paddingLeft: "10px",
                        paddingRight: "30px",
                        lineHeight: "50px",
                      }}
                    >
                      <span style={{ color: "#555", fontSize: "24px" }}>
                        {" "}
                        A.{" "}
                      </span>
                      {element.answer}
                    </p>
                  </React.Fragment>
                ))}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFAQ} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Copyright />
      </main>
    </React.Fragment>
  );
}