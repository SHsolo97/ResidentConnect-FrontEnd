import Grid from "@material-ui/core/Grid";
import React from "react";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Field, FieldArray, reduxForm } from "redux-form";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';

import {
renderRatingField,renderDateField,
renderTextField,
renderRadioGroup,
renderSelectField,
renderCheckbox,
} from "../../misc/form-fields";
import PrimaryButton from "../../shared/components/PrimaryButton";

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
        <Stack spacing={3}>

    <div>
      <Field name="category" style={{ width: "29ch" }}  component={renderSelectField} label="Category" variant="outlined">
        <option value="" />
        <option value="maintenance">Maintenance</option>
        <option value="facilitybooking">Facility Booking</option>
        <option value="water">Water Bill</option>
      </Field>
    </div>
    <div>
      <Field id="amt" name="amt" style={{ width: "33ch" }} component={renderTextField} label="Amount" variant="outlined" />
    </div>
    <div>
      <Field   name="period" views={['year', 'month']}
          label="Payment Period"   maxDate={new Date()} component={renderDateField} variant="outlined" />
    </div>
    <div>
      <Field   name="dueat" 
          label="Due At"  minDate={new Date()} component={renderDateField} variant="outlined" />
    </div>
    
  </Stack>
  <PrimaryButton type="submit">Submit</PrimaryButton>
    <PrimaryButton> Cancel</PrimaryButton>
</form>
);
};
return <div>{renderForm()}</div>;
};
export default reduxForm({
form: "cardForm", // a unique identifier for this form
})(CreatePaymentForm);

