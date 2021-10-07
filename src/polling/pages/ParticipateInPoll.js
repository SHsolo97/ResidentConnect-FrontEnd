import React from "react";
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { useProfile } from "../../context/profile.context";
import pollingAPI from '../../misc/axios-calls/pollingAPI';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import PollResultBar from '../../shared/components/PollResultBar';
import Typography from '@mui/material/Typography';


export const ParticipateInPoll = ({...props}) => {
   const [poll,setPoll]=React.useState(props.poll);
  const {options,_id,question,totalvotes}=poll
  const [isAnswerd,setIsAnswered]=React.useState(false);
    const {user}=useProfile();
    const [option,setOption]=React.useState(null);

    const editPoll = async (data) => {
        var apiBaseUrl = `/pollings/${_id}`
    
        await pollingAPI.put(apiBaseUrl, data)
          .then(function (response) {
            if (response.status === 200) {    
              ////console.log(response.data);
              setPoll(response.data);
              setIsAnswered(true);
             
            }
    
          })
          .catch(function (error) {
            console.log(error);    
          });
      }

    const onSubmit=()=>{
      if(option!=null)
      {
      const selectedOption = options.filter(o=>o._id===option)[0];
      //console.log(selectedOption);
      const data={};
      data['answeredby']=user._id;
      data['totalvotes']=totalvotes+1;
      data['optionid']=option;
      data['selectedoptionvotes']=selectedOption.votes+1;
      //console.log(data);
      editPoll(data);
      }
    }
    const renderQuestion=()=>{
      return(
        <Dialog  maxWidth='md' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
         
          <DialogContent>
            <div style={{fontSize:'28px', fontWeight:'bold'}}> {question} </div>
            <FormLabel  style={{marginTop:'16px'}} component="legend">select option</FormLabel>
      <RadioGroup
  
        value={option}
        onChange={(e)=>{
          setOption(e.target.value)
         
          }}
      >
      
     
            {options.map((option,index)=>{
              return <FormControlLabel  style={{marginTop:'16px'}} value={option._id} control={<Radio />} label={option.description} />
            
            })}
             </RadioGroup>
          </DialogContent>
          <Grid container direction="row"  justifyContent="space-around" alignItems="center">
                  <PrimaryButton  style={{marginBottom:'50px'}}onClick={onSubmit}>Submit</PrimaryButton>
                  <PrimaryButton style={{marginBottom:'50px'}} onClick={props.handleClose}>Cancel</PrimaryButton>
                </Grid>
         
        </Dialog>
      )
    }

    const renderResult=()=>{
      const totalParticipants=poll.answeredby.length;

      return(
        <Dialog  maxWidth='md' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
         
          <DialogContent>
            <div style={{fontSize:'28px', fontWeight:'bold'}}> {question} </div>
            <FormLabel  style={{marginTop:'16px'}} component="legend">select option</FormLabel>
      <RadioGroup
  
        value={option}
        onChange={(e)=>{
          setOption(e.target.value)
         
          }}
      >
      
     
            {options.map((option,index)=>{
                 let   percentail=0;
                 if(totalParticipants!==0)
                         percentail= Math.round(((parseInt(option.votes)/parseInt(totalParticipants))*100),1);
                 
              return <div>
                <FormControlLabel  style={{marginTop:'16px'}} value={option._id} control={<Radio />} label={option.description} />
                <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                               <PollResultBar  progress={percentail} height={20} /> 
<Typography variant="body2" gutterBottom>{percentail}% </Typography>
                                             </Grid>
                                             </div>
            
            })}
             </RadioGroup>
          </DialogContent>
          <Grid container direction="row"  justifyContent="space-around" alignItems="center">
                  <PrimaryButton style={{marginBottom:'50px'}} onClick={props.handleClose}>Close</PrimaryButton>
                </Grid>
         
        </Dialog>
      )
    }


    return (<div>
      {!isAnswerd &&  renderQuestion()}
      {isAnswerd &&  renderResult()}

      </div>
      );
    };
