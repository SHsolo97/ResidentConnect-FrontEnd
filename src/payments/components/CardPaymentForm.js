

import React from 'react'
import { Field, FieldArray, reduxForm } from "redux-form";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import cardlogos from '../../images/payments/cardlogos.png'
import {
    renderRatingField,renderDateField,
    renderTextField,
    renderRadioGroup,
    renderSelectField,
    renderCheckbox,
    } from "../../misc/form-fields";
export const CardPaymentForm = ({...props}) => {
    const currentYear = (new Date()).getFullYear();
    const onSubmit=(formValues)=>{
       console.log(formValues);
    }
      const renderForm = () => {
    
        return (
        <form onSubmit={props.handleSubmit(onSubmit)}>
            
          <Grid
  container 
  direction="row"
 
 
>       
      <Field id="cardpart1" name="cardpart1" style={{ marginLeft:"10px" , width: "8ch" }} component={renderTextField} variant="outlined" />
   
    
      <Field id="cardpart2" name="cardpart2" style={{ marginLeft:"10px" , width: "8ch" }} component={renderTextField} variant="outlined" />
   
      <Field id="cardpart3" name="cardpart3" style={{marginLeft:"10px"  , width: "8ch" }} component={renderTextField} variant="outlined" />
    
      <Field id="cardpart4" name="cardpart4" style={{ marginLeft:"10px" , width: "8ch" }} component={renderTextField} variant="outlined" />
      <Field id="cvv" name="cvv" style={{   marginLeft:"200px" , width: "8ch" }} component={renderTextField} variant="outlined" />

    </Grid>
    <Grid 
  container
  direction="row"

 
>
<Field name="expmonth" style={{ marginTop:"60px", marginLeft:"10px" , width: "8ch" }}  component={renderSelectField}  variant="outlined">
        <option value="" />
        {[...Array(12)].map((item, i) => <option value={i+1}> {i+1} </option>)}
       
      </Field>   
      <Field name="expyear" style={{ marginTop:"60px", marginLeft:"10px" ,  width: "10ch" }}  component={renderSelectField}  variant="outlined">
        <option value="" />
        {[...Array(12)].map((item, i) => <option value={currentYear+i}> {currentYear+i} </option>)}
       
      </Field>    
    

</Grid>
  
                    </form>
                    
                )}
                
     return (
        <div style={{marginTop:"100px"}}>
            <img src={cardlogos}/>
            <div style={{marginTop:"30px"}}>
            {renderForm()}
            </div>
        </div>
    )
}

export default reduxForm({
    form: "cardForm", // a unique identifier for this form
    })(CardPaymentForm);
