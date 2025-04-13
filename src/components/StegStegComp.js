import React,{useState,useRef} from 'react';
import emailjs from "@emailjs/browser";
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import LastStep from './LastStep';
import { Oval } from "react-loader-spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
    margin:'0.5rem 0.5rem',
    cursor:'pointer'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign:'center',
    fontSize:'0.9rem'
  },
}));

function getSteps() {
  return ['Contact details', 'Review booking', 'Confirmation'];
}

const StegStegComp = ({fordonet,dagar,hyrData}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const steps = getSteps();
const [renterName, setRenterName] = useState('')
const [renterNumber, setRenterNumber] = useState('')
const [renterEmail, setRenterEmail] = useState('')
const [sendingBooking, setSendingBooking] = useState(false)
  const form = useRef();
const history = useHistory()
  const formattedFromDate = hyrData?.rentFromDate.toLocaleDateString("en-US", {
    weekday: "short",  // "Thu"
    month: "short",    // "Apr"
    day: "2-digit",    // "17
    year: "numeric"    // "2025"
  });

  const formattedEndmDate = hyrData?.rentTodate.toLocaleDateString("en-US", {
    weekday: "short",  // "Thu"
    month: "short",    // "Apr"
    day: "2-digit",    // "17
    year: "numeric"    // "2025"
  });

const handleClose = () => {
  setOpen(false);
};

  const handleNext = (e) => {
    if(renterName.length<3 || renterNumber.length<7 || renterEmail.length<4){
      setOpen(true)
      return
    } 
    if(e.target.textContent=='Book Now'){
   sendConfirmationAndNewBooking()
    }
 setActiveStep(1)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



   const sendConfirmationAndNewBooking = () => {
    setSendingBooking(true)
      emailjs
        .sendForm(
          "service_8lk3ojg",
          "template_q9jc4d5",
          form.current,
          'CL-gbXxFWO6fGlczt'
        )
        .then(
          (result) => {
            if (result.text === "OK") {
              console.log('OK')
              setSendingBooking(false)
             setActiveStep(2)
             setTimeout(()=>{
              history.push('/')
             },6000)
            }
          },
          (error) => {
            console.log(error.text);
          }
        );
    };

  return (
    <div  className={classes.root}>
     <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"There is missing information!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          We need all the information to process your booking. Please fill in all the contact details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose} color="primary">
          Agree
          </Button>
       
        </DialogActions>
      </Dialog>
    </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
     {activeStep==0 && <StepOne setRenterEmail={setRenterEmail} setRenterName={setRenterName} setRenterNumber={setRenterNumber}/>}
     {activeStep==1 && <StepTwo namn={renterName} nummer={renterNumber} hansemail={renterEmail} vehicle={fordonet} antaldar={dagar}/>}
    {activeStep==2 &&   <LastStep vehicle={fordonet}/>} 
   
      <div>
      
    
          <div style={{padding:'0.5rem'}}>
            <div style={{width:'100%',display:'flex',justifyContent:'space-between',marginTop:'2rem'}}>
            {activeStep !== 2 &&   <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>}
          
              {sendingBooking ? <div>   
                          <Oval
                          height={40}
                          width={40}
                          color="#4fa94d"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="oval-loading"
                          secondaryColor="#4fa94d"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        /></div> :<div>
                          {activeStep !== 2 &&  <Button style={{margin:'0.5rem 0.5rem',width:'7rem',background:activeStep==1&&'#32de84',color:activeStep==1 && 'black'}} variant="contained" color="primary" onClick={handleNext}>
                {activeStep==1?'Book Now':'Next'}
              </Button>}
                        </div>}
            </div>
          </div>
  
      </div>
      <div style={{height:'50px'}}></div>
      <div style={{display:'none'}}>
        <form onSubmit={(e)=> e.preventDefault()} ref={form}>
        <input
            name="renterName"
            type="text"
            readOnly
            value={renterName}
          />
           <input
            name="renterEmail"
            type="text"
            readOnly
            value={renterEmail}
          />
             <input
            name="renterPhone"
            type="text"
            readOnly
            value={renterNumber}
          />
            <input name="period" type="text" readOnly value={`${dagar} days`} />
            <input name="totalPayment" type="text" readOnly value={`${fordonet[0].Price}$/day (20% discount monthly rent)`} />
            <input name="fromDate" type="text" readOnly value={formattedFromDate} />
            <input name="toDate" type="text" readOnly value={formattedEndmDate} />
            <input
            name="reservNumber"
            type="text"
            readOnly
            value={hyrData?.resNumber}
          />
        </form>
      </div>
    </div>
  );
}

export default StegStegComp

