import React from 'react'
import { Field, FieldArray, reduxForm } from "redux-form";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import PrimaryButton from "../../shared/components/PrimaryButton";

import cardlogos from '../../images/payments/cardlogos.png'
import {
  renderRatingField, renderDateField,
  renderTextField, renderFormLabel,exactLength,number,required,maxLength,minLength,normalizeCardNumber,
  renderRadioGroup,
  renderSelectField,
  renderCheckbox,
} from "../../misc/form-fields";
import { MenuItem } from '@mui/material';
export const CardPaymentForm = ({ ...props }) => {
  const currentYear = (new Date()).getFullYear();
  const onSubmit = (formValues) => {
    console.log(formValues);
  }
  const renderForm = () => {

    return (
      <form onSubmit={props.handleSubmit(onSubmit)}>
        <Grid container direction="row">
          <FormLabel  style={{ marginBottom: "10px", marginLeft: "50px"}}>Card Number </FormLabel>
          <FormLabel  style={{ marginBottom: "10px",  marginLeft: "250px"}}>CVV </FormLabel>  
          </Grid>
           <Grid container direction="row">
           <Field  inputProps={{ maxLength: 19 }}
 id="card" name="card" normalize={normalizeCardNumber} validate={[exactLength(19),required]} style={{ marginLeft: "10px", width: "24ch" }} component={renderTextField} variant="outlined" />

          
          <Field inputProps={{ maxLength: 4 }} id="cvv" name="cvv"  validate={[minLength(3),number,required]} style={{ marginLeft: "160px", width: "8ch" }} component={renderTextField} variant="outlined" />
        
        
        </Grid>
        <Grid container direction="row">
          <FormLabel style={{ marginTop: "30px", marginBottom: "10px", marginLeft: "50px"}}> Exp Date </FormLabel>
       
          </Grid>
           <Grid container direction="row">
          <Field name="expmonth" validate={[required]} style={{ marginTop: "10px", marginLeft: "10px", width: "8ch" }} component={renderSelectField} variant="outlined">
            <MenuItem value="" />
            {[...Array(12)].map((item, i) => <MenuItem value={i + 1}> {i + 1} </MenuItem>)}

          </Field>
          <Field name="expyear" validate={[required]} style={{ marginTop: "10px", marginLeft: "10px", width: "10ch" }} component={renderSelectField} variant="outlined">
            <MenuItem value="" />
            {[...Array(12)].map((item, i) => <MenuItem value={currentYear + i}> {currentYear + i} </MenuItem>)}

          </Field>

  
        </Grid>
        <Grid container style={{ marginTop: "10px"}} direction="row">
      <PrimaryButton> Pay</PrimaryButton>
        <PrimaryButton> Cancel</PrimaryButton>
        </Grid>
        </form>

    )
  }

  return (
    <div style={{ marginTop: "80px" }}>
      <img src={cardlogos} />
      <div style={{ marginTop: "10px" }}>
        {renderForm()}
      </div>
    </div>
  )
}

export default reduxForm({
  form: "cardForm", // a unique identifier for this form
})(CardPaymentForm);