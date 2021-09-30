
import React from "react";
import Grid from '@mui/material/Grid';
import { Field,  reduxForm } from "redux-form";
import Paper from '@mui/material/Paper';

import MenuItem from '@material-ui/core/MenuItem';
import {
renderDateField,
renderTextField,
renderSelectField,required

} from "../../misc/form-fields";
import {PrimaryButton}from "../../shared/components/PrimaryButton";

export const CreatePaymentForm = ({...props}) => {

const onSubmit=(formValues)=>{
    const formData={};
    formData['period']=`${formValues.period.getMonth()+1}-${formValues.period.getFullYear()}`;
    formData['category']=formValues.category;   
    formData['dueat']=formValues.dueat;
    formData['amt']=formValues.amt;
    formData['status']='due';
    props.setFormData(formData);
}
    const renderForm = () => {
    
return (
<form onSubmit={props.handleSubmit(onSubmit)}>
<Paper elevation={3} style={{padding:'50px', width:"800px"}}>
<Grid container direction="column" justifyContent="space-around" alignItems="center">
  
      <Field name="category" label="Category"   validate ={[required]} style={{ marginTop: 8, width: '35ch'}} component={renderSelectField}  variant="outlined">
     
        <MenuItem id="maintenance" value="maintenance">Maintenance</MenuItem>
        <MenuItem id="facilitybooking" value="facilitybooking">Facility Booking</MenuItem>
        <MenuItem id="water" value="water">Water Bill</MenuItem>
          </Field>
  
      <Field id="amt" name="amt" style={{ marginTop: 34, width: '35ch'}}  component={renderTextField} label="Amount" variant="outlined" />
      <div style={{ marginTop: 34, width: '35ch'}} >
      <Field    name="period" views={['year', 'month']}
          label="Payment Period"   maxDate={new Date()} component={renderDateField} variant="outlined" />
    </div>
    <div style={{ marginTop: 34, width: '35ch'}} >
      <Field   name="dueat"  
          label="Due At"  minDate={new Date()} component={renderDateField} variant="outlined" />
    </div>
    
 
  </Grid>
  <Grid container direction="row" justifyContent="center" alignItems="center">

  <PrimaryButton  style={{ marginTop: 34}} type="submit">Submit</PrimaryButton>
    <PrimaryButton style={{ marginTop: 34,marginLeft:34}} > Cancel</PrimaryButton>
    </Grid>
    </Paper>
</form>
);
};
return <div>{renderForm()}</div>;
};
export default reduxForm({
form: "cardForm", // a unique identifier for this form
})(CreatePaymentForm);

