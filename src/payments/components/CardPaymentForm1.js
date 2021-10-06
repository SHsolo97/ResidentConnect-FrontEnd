import React from 'react'
import { Field,  reduxForm } from "redux-form";
import { CardElement,useElements,useStripe } from "react-stripe-elements";

import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import {PrimaryButton}from "../../shared/components/PrimaryButton";

import cardlogos from '../../images/payments/cardlogos.png'
import {
 
  renderTextField,exactLength,number,required,minLength,normalizeCardNumber, 
  renderSelectField,

} from "../../misc/form-fields";
import { MenuItem } from '@mui/material';
export const CardPaymentForm1 = ({ ...props }) => {
  const elements=useElements();
  const stripe=useStripe();
  const currentYear = (new Date()).getFullYear();
  const onSubmit = (formValues) => {
    console.log(formValues);
    if(!stripe || !elements)
       return;
  }
  const renderForm = () => {

    return (
      <form onSubmit={props.handleSubmit(onSubmit)}>
        
          <CardElement id='card-element'/>
         <PrimaryButton> Pay</PrimaryButton>
        <PrimaryButton> Cancel</PrimaryButton>
        
        </form>

    )
  }

  return (
    <div style={{ marginTop: "80px" }}>
      <img alt="card logo" src={cardlogos} />
      <div style={{ marginTop: "10px" }}>
        {renderForm()}
      </div>
    </div>
  )
}

export default reduxForm({
  form: "cardForm", // a unique identifier for this form
})(CardPaymentForm1);