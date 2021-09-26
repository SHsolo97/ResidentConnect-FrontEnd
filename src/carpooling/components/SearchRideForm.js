import React from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import {  renderTextField, renderDateTimeField,required,number,minValue } from "../../misc/form-fields";


const SearchRideForm = ({...props}) => {
  const submitForm=(formValues)=>{
          props.onSubmit(formValues);
  }    
return (

<form onSubmit={props.handleSubmit(submitForm)}>
  <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
  <Field name="source" label="Start Point" validate={[required]} style={{marginTop:'50px', width:'200px'}} component={renderTextField} variant="outlined" />
  <Field name="destination" label="End Point" validate={[required]} style={{marginTop:'50px', width:'200px'}} component={renderTextField} variant="outlined" />
  <Field style={{marginTop:'20px', width:'200px'}} validate={[required,number,minValue(1)]} name="seats" component={renderTextField} label="Seats Offer"  variant="outlined" />

    <Field style={{marginTop:'50px', width:'800px'}} name="starttime" label="Ride  between" minDate={new Date()} component={renderDateTimeField} variant="outlined" />
    <Field style={{marginTop:'50px', width:'800px'}} name="endtime" label="Ride  between" minDate={new Date()} component={renderDateTimeField} variant="outlined" />


  </Grid>
  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
    <PrimaryButton type="submit">Search</PrimaryButton>
 
  </Grid>
</form>



)
}

export default reduxForm({
form: "searchRideForm", // a unique identifier for this form

})(SearchRideForm);