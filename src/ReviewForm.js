import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GlobalState from './GlobalState';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import dateFormat from 'dateformat';

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor : "#373737",
    color: "#fff",
    padding : "1px",
    borderRadius : "4px",
    textAlign: "justify",
    paddingRight: "40px"
  },

  boxRed: {
    backgroundColor : "#dc2626",
    color: "#fff",
    padding : "1px",
    borderRadius : "4px",
    textAlign: "justify",
    paddingRight: "40px"
  },

  boxInfo: {
    textAlign: "justify",
    backgroundColor : "#fafafa",
    color: "#333",
    padding : "1px",
    borderRadius : "4px",
    paddingRight: "40px",
    border: "1px solid #eee",
  },


  

  ul: {
     listStyle: "none"
  },

  li: {
    marginBottom : "5px"
  },


  icon: {
    marginRight : "8px"
  },

  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },

  infoDetails:{
    textAlign: "left"
  },

  infoTitle:{
    fontWeight: "800",
    marginRight: "10px"
  },

  infoData:{
    fontWeight: "400",
  },

  title:
  {
    textAlign : "center",
    fontWeight : "500",
    margin: "10px",
    backgroundColor : "#eee",
    padding : "10px",
    borderRadius : "4px"

  },

  Accordion:{
    backgroundColor : "#f5f5f5",
    color: "#222"
  }

}));


export default function ReviewForm() {
    const classes = useStyles();

    const [state, setState] = React.useContext(GlobalState);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Your Data
      </Typography>

      <Grid container direction="column" spacing={1} justify="flex-start"  alignItems="stretch">
          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                <FontAwesomeIcon icon={faCalendarAlt} className={classes.icon} />
                    {dateFormat(new Date(state.bookingDate),'dd-mmmm-yyyy')}
                </li>
                <li className={classes.li}>
                <FontAwesomeIcon icon={faHourglassHalf} className={classes.icon} />
                   Check-up Duration: 30 minutes
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                <FontAwesomeIcon icon={faClock} className={classes.icon} />
                   Time: {state.bookingTime}
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                    Package : In-Clinic Test
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                   Price : £199
                </li>
              </ul>
            </div>
          </Grid> 

          <Grid item xs={12} md={12}>
            <div className={classes.box}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                 This time slot is not guaranteed, due to nature of healthcare there might be slight delay to your appointment.
                </li>
              </ul>
            </div>
          </Grid> 
          
          <Grid item xs={12} md={12}>
            <div className={classes.boxRed}>
              <ul className={classes.ul}>
                <li className={classes.li}>
                During the coronavirus pandemic, we must confirm appointments in order to maintain social distancing, 
                we will email you to confirm your booking if your selected time is possible.
                 If not, we will contact you with the nearest availability to your request. 
                 Thank you for understanding.
                </li>
              </ul>
            </div>
          </Grid> 

          <span className={classes.title}> Appointment is for the following people :</span>


          {state.persons.map((person,index) => (
   
                  <Grid item xs={12} md={12}>
                  <div className={classes.root}>
                      <Accordion className={classes.Accordion} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                      <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1bh-content"
                          id={`panel${index}bh-header`}
                      >
                          <Typography className={classes.heading}> {`#${index+1}`} </Typography>
                          <Typography className={classes.secondaryHeading}>
                          {`${person.firstname} ${person.lastname}`}
                          </Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes.infoDetails}>
                          
                          <ul className={classes.ul}>
                              <li className={classes.li}>
                              <span className={classes.infoTitle}>Gender</span> <span className={classes.infoData}>{person.gender}</span>   
                              </li>
                              <li className={classes.li}>
                              <span className={classes.infoTitle}>Title</span>  <span className={classes.infoData}>{person.title}</span>   
                              </li>
                              <li className={classes.li}>
                              <span className={classes.infoTitle}>Forename</span> <span className={classes.infoData}>{person.firstname}</span>   
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Surname</span> <span className={classes.infoData}>{person.lastname}</span>   
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Email</span> <span className={classes.infoData}>{person.email}</span>   
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>D.O.B</span> <span className={classes.infoData}>{dateFormat(new Date(person.birthDate),'dd mmm yyyy') }</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Telephone</span> <span className={classes.infoData}>{person.phone}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Post Code</span> <span className={classes.infoData}>{person.postCode}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Address</span> <span className={classes.infoData}>{person.address}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Notes</span> <span className={classes.infoData}>{person.notes ?? 'N/A'}</span>  
                              </li>
                              <li className={classes.li}>
                                  <span className={classes.infoTitle}>Passport No.</span> <span className={classes.infoData}>{person.passportNumber ?? 'N/A'}</span>  
                              </li>
                          </ul>
                          
                          </AccordionDetails>
                          </Accordion>
                      </div>
                    </Grid> 
                    ))}


          <Grid item xs={12} md={12}>
              <div className={classes.root}>
                  <Accordion className={classes.Accordion} expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel10bh-content"
                      id="panel10bh-header"
                    >
                      <Typography className={classes.heading}> {`#${state.persons.length + 1}`} </Typography>
                      <Typography className={classes.secondaryHeading}>
                        {`${state.firstname} ${state.lastname}`}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.infoDetails}>
                      
                        <ul className={classes.ul}>
                          <li className={classes.li}>
                            <span className={classes.infoTitle}>Gender</span> <span className={classes.infoData}>{state.gender}</span>   
                          </li>
                          <li className={classes.li}>
                            <span className={classes.infoTitle}>Title</span>  <span className={classes.infoData}>{state.title}</span>   
                          </li>
                          <li className={classes.li}>
                            <span className={classes.infoTitle}>Forename</span> <span className={classes.infoData}>{state.firstname}</span>   
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Surname</span> <span className={classes.infoData}>{state.lastname}</span>   
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Email</span> <span className={classes.infoData}>{state.email}</span>   
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>D.O.B</span> <span className={classes.infoData}>{dateFormat(new Date(state.birthDate),'dd mmm yyyy') }</span>  
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Telephone</span> <span className={classes.infoData}>{state.phone}</span>  
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Post Code</span> <span className={classes.infoData}>{state.postCode}</span>  
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Address</span> <span className={classes.infoData}>{state.address}</span>  
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Notes</span> <span className={classes.infoData}>{state.notes ?? 'N/A'}</span>  
                          </li>
                          <li className={classes.li}>
                             <span className={classes.infoTitle}>Passport No.</span> <span className={classes.infoData}>{state.passportNumber ?? 'N/A'}</span>  
                          </li>
                        </ul>
                      
                    </AccordionDetails>
                  </Accordion>
                </div>
          </Grid> 
      </Grid>
    </React.Fragment>
  );
}

