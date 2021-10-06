import React from 'react'
import { Field,  reduxForm } from "redux-form";
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';
import paymentsAPI from '../../misc/axios-calls/paymentsAPI';

import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import {useProfile} from "../../context/profile.context";

import cardlogos from '../../images/payments/cardlogos.png'
import {
 
  renderTextField,exactLength,number,required,minLength,normalizeCardNumber, 
  renderSelectField,

} from "../../misc/form-fields";
import MenuItem from '@material-ui/core/MenuItem';
export const CardPaymentForm = ({ ...props }) => {
  const {user}=useProfile();
  const history=useHistory();
  const currentYear = (new Date()).getFullYear();
  
  
  const editPayment=async(paymentsdata)=>{
    var apiBaseUrl = `/payments/${props.bill._id}`;

    await paymentsAPI
      .put(apiBaseUrl, paymentsdata)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          if(user.type==='admin')
            history.push('/paymentA')
           else
           history.push('/paymentR')
        }
      })
      .catch(function (error) {
        console.log(error);
       
      });

}
const onSubmit = (formValues) => {
  console.log(formValues);
  const paymentsdata={}
  paymentsdata['status']='paid';
  paymentsdata['paidon']=new Date();
  const paymentdetails={}
  paymentdetails['cardnumber']='XXXX-XXXX-XXXX-'.concat(formValues.card.slice(15));
  paymentdetails['type']='card'
  paymentsdata['paymentdetails']=paymentdetails;
  console.log(paymentsdata);
  editPayment(paymentsdata);
}

  const cancelPayment =()=>{
    if(user.type==='admin')
      history.push('/paymentA')
    else
    history.push('/paymentR')
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
      <PrimaryButton type="submit"> Pay</PrimaryButton>
        <PrimaryButton  onClick={cancelPayment} style={{ marginLeft: "20px"}} > Cancel</PrimaryButton>
        </Grid>
      
        </form>

    )
  }

  return (
    <div style={{ marginTop: "80px" }}>
         <Paper style={{ marginLeft:'150px', width:'800px', padding: "80px" }}>
           <img alt="card logo" src={cardlogos} />
      <div style={{ marginTop: "10px" }}>
        {renderForm()}
      </div>
      </Paper>
    </div>
  )
}

export default reduxForm({
  form: "cardForm", // a unique identifier for this form
})(CardPaymentForm);