import React from "react";
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import {  renderTextField, renderDateTimeField,required,number,minValue } from "../../misc/form-fields";
import { Paper } from '@mui/material';


const SearchRideForm = ({...props}) => {
  const submitForm=(formValues)=>{
          props.onSubmit(formValues);
  }    
return (

<form onSubmit={props.handleSubmit(submitForm)}>
  <Paper elevation={3}  style={{padding:'20px',marginLeft:'300px',marginTop:'20px',marginBottom:'20px', width:'800px'}}>
  <Grid container direction="column" justifyContent="flex-start" alignItems="center">
  <Field name="source" label="Start Point" validate={[required]} style={{marginTop:'20px', width:'200px'}} component={renderTextField} variant="outlined" />
  <Field name="destination" label="End Point" validate={[required]} style={{marginTop:'20px', width:'200px'}} component={renderTextField} variant="outlined" />
  <Field style={{marginTop:'20px', width:'200px'}} validate={[required,number,minValue(1)]} name="seats" component={renderTextField} label="Seats Offer"  variant="outlined" />

  <div  style={{marginTop:'20px', width:'200px'}}>
    <Field name="starttime" label="Ride  between" 
    minDate={new Date()} component={renderDateTimeField} variant="outlined" />
    </div>
    <div  style={{marginTop:'20px', width:'200px'}}>
    <Field  name="endtime" label="Ride  between"
     minDate={new Date()} component={renderDateTimeField} variant="outlined" />

    </div>
    <Grid container direction="row" justifyContent="center" alignItems="center">

    <PrimaryButton style={{marginTop:'20px'}} type="submit">Search</PrimaryButton>
    <PrimaryButton style={{marginTop:'20px',marginLeft:'20px'}}> Cancel</PrimaryButton>
  </Grid>
  </Grid>
  
  </Paper>
</form>



)
}

export default reduxForm({
form: "searchRideForm", // a unique identifier for this form

})(SearchRideForm);