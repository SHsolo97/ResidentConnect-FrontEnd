import React, { useState } from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import { Alert } from "../../shared/components/Alert";
import { useAlertState } from "../../misc/custom-hooks";
import { Progress } from "../../shared/components/Progress";
import { useProfile } from "../../context/profile.context";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import { Stack } from "@mui/material";
import pollingAPI from '../../misc/axios-calls/pollingAPI';
import { useCommunity } from "../../context/community.context";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ControlCameraOutlined } from "@material-ui/icons";

export const ParticipateInPoll = ({...props}) => {
  const {options,_id,question,totalvotes}=props.poll;
    const {community}=useCommunity();
    const {user}=useProfile();
    const [option,setOption]=React.useState(null);

    const editPoll = async (data) => {
        var apiBaseUrl = `/pollings/${_id}`
    
        await pollingAPI.put(apiBaseUrl, data)
          .then(function (response) {
            if (response.status === 201) {    
              console.log(response.data);
             props.handleClose();
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
      console.log(selectedOption);
      const data={};
      data['answeredby']=user._id;
      data['totalvotes']=totalvotes+1;
      data['optionid']=option;
      data['selectedoptionvotes']=selectedOption.votes+1;
      console.log(data);
      editPoll(data);
      }
    }


    return (
        <Dialog  maxWidth='xl' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <SectionHeader>  Polling </SectionHeader>
          </DialogTitle>
          <DialogContent>
            <div> {question} </div>
            <FormLabel component="legend">select option</FormLabel>
      <RadioGroup
  
        value={option}
        onChange={(e)=>{
          setOption(e.target.value)
         
          }}
      >
      
     
            {options.map((option,index)=>{
              return <FormControlLabel value={option._id} control={<Radio />} label={option.description} />
            
            })}
             </RadioGroup>
          </DialogContent>
          <Grid container direction="row" justifyContent="space-around" alignItems="center">
                  <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
                  <PrimaryButton onClick={props.handleClose}>
                    {" "}
                    Cancel{" "}
                  </PrimaryButton>
                </Grid>
         
        </Dialog>
      );
    };
