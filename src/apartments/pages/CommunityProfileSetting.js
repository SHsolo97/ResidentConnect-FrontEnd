import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Community} from './Community';
import {Apartments} from './Apartments';
import { ApartmentModels } from './ApartmentModels';
import { ApartmentBlocks } from './ApartmentBlocks';
import { PageHeader } from '../../shared/components/PageHeader'
import { ApartmentServices } from './ApartmentServices';
import { useHistory } from 'react-router-dom';
import PrimaryButton from '../../shared/components/PrimaryButton';
import communityAPI from '../../misc/axios-calls/communityAPI';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'10ch',
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

const STEPPER_DEFAULT=[
    {title:'Community',
     content:'Community Details'},
    {title:'Apartment Models',
     content:'Apartment Models'},
    {title:'Blocks',
     content:'Blocks'},
    {title:'Apartments',
     content:'Apartments'},
    {title:'Services',
     content:'Services'}
    ]


export default function  CommunityProfileSetting()
{
    return ( <CommunityStepper stepperInfo={STEPPER_DEFAULT} />);
}


 function CommunityStepper({children,...props}) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const stepperInfo=props.stepperInfo;
    const history=useHistory();  
    
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
  
  
   const getPage=(activeStep)=>
   {
    switch (activeStep) {
        case 0:
            return <Community  handleNext={handleNext}>{stepsContent[0]}</Community>
        case 1:
            return <ApartmentModels handleBack={handleBack}  handleNext={handleNext} >{stepsContent[1]}</ApartmentModels>
        case 2:
            return <ApartmentBlocks  handleBack={handleBack}  handleNext={handleNext}>{stepsContent[2]}</ApartmentBlocks>
        case 3:
            return <Apartments handleBack={handleBack}  handleNext={handleNext}>{stepsContent[3]}</Apartments>
        case 4:
            return <ApartmentServices  handleBack={handleBack}  handleNext={handleNext}>{stepsContent[4]}</ApartmentServices>
        default:
            return <h1>Unknown</h1>
     }
   }
    return (
      <div className={classes.root}>
        <Stepper  activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
             { 
             getPage(activeStep)
            }
             
          
        </div>
     
    );
  }