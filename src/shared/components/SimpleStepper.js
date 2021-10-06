import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


export default function SimpleStepper({children,...props}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const stepperInfo=props.stepperInfo;

  const steps = getSteps();
  const stepsContent=getStepContentDetails();
  function getSteps() {
      let titles=[];
    stepperInfo.map((info)=>(
        titles.push(info.content)

    ));
    
    //return ['Community', 'Apartment Models', 'Blocks','Apartments','Facilties'];
    return titles;
  }

  function getStepContentDetails() {
    let contents=[];
  stepperInfo.map((info)=>(
    contents.push(info.title)

  ));
  //return ['Community', 'Apartment Models', 'Blocks','Apartments','Facilties'];
  return contents;
}

  
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return stepsContent[0];
      case 1:
        return stepsContent[1];
      case 2:
        return stepsContent[2];
      case 3:
        return stepsContent[3];
      case 4:
          return stepsContent[4];
      default:
          return 'Unknown';
    }
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
