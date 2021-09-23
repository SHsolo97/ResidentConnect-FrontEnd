import React, { useState } from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray,reduxForm } from "redux-form";
import { renderRatingField, renderTextField, renderDateField,required } from "../../misc/form-fields";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";

import { useProfile } from "../../context/profile.context";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import { Stack } from "@mui/material";
import pollingAPI from '../../misc/axios-calls/pollingAPI';
import { useCommunity } from "../../context/community.context";


export const CreatePolling = ({...props}) => {
    const {community}=useCommunity();
    const {user}=useProfile();
    
    const communityid=community._id;

    const createPoll = async (data) => {
        var apiBaseUrl = `/pollings/create`
    
        await pollingAPI.post(apiBaseUrl, data)
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

    const onSubmit=(formValues)=>{
        console.log(formValues);
        let data={...formValues};
        data['question']=formValues.question;
        data['expiredat']=formValues.expiredat;
        const options=[];
        formValues.options.map(option=>{
            let op={}
            op['description']=option;
            op['votes']=0;
            options.push(op);
        })
        data['options']=options;
        data['communityid']=communityid;
        data['totalvotes']=0;
        data['createdby']=user._id;
        data['answeredby']=[];
       
        console.log(data);
        createPoll(data);

    }
    
const PollingOptions = ({ fields}) => (
<div>
    <h3> Options  <IconButton onClick={()=> {fields.push({})}}> <AddCircleIcon />       </IconButton> </h3>
    <Stack spacing={1} >
    {fields.map((options, index) => (
     
        <div key={index}>
       <Field validate={[required]} name={options} 
        style={{width:'800px'}}   label={`Option ${index+1}`} component={renderTextField} variant="outlined" />
  
                  <IconButton onClick={() => {fields.remove(index)}} ><RemoveCircleIcon /> </IconButton>
        </div>
     
    ))}
     </Stack>
  </div>
    );
    return (
        <Dialog  maxWidth='xl' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <SectionHeader> Create Poll </SectionHeader>
          </DialogTitle>
          <DialogContent>
          <form onSubmit={props.handleSubmit(onSubmit)}>
              <Grid container direction="column" justifyContent="space-around" alignItems="center">
               
              
                  <Field style={{width:'800px'}} validate={[required]} name="question" id="question" component={renderTextField} label="Question" multiline rows={5} palceholder="enter Polling Question"
                  variant="outlined" />
             <Field   name="expiredat" 
          label="Expire At"  minDate={new Date()} component={renderDateField} variant="outlined" />
                <FieldArray   name="options" component={PollingOptions}/>
                
                <Grid container direction="row" justifyContent="space-around" alignItems="center">
                  <PrimaryButton type="submit">Submit</PrimaryButton>
                  <PrimaryButton onClick={props.handleClose}>
                    {" "}
                    Cancel{" "}
                  </PrimaryButton>
                </Grid>
              </Grid>
            </form> 
          </DialogContent>
         
        </Dialog>
      );
    };
    

    export default reduxForm({
        form: "pollingForm", // a unique identifier for this form
        
      })(CreatePolling);
