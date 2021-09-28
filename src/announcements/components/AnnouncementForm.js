import React from "react";
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import {  renderTextField, renderDateField,required } from "../../misc/form-fields";


const AnnouncementForm = ({...props}) => {


return (

<form onSubmit={props.handleSubmit(props.onSubmit)}>
<Grid spacing={3}
  container
  direction="column"
  justifyContent="center"
  alignItems="flex-start"
><Field style={{width:'800px'}} validate={[required]} name="title" id="title" component={renderTextField} label="Title" palceholder="Enter Title" variant="outlined" />
  <Field style={{ marginTop:'24px', width:'800px'}} validate={[required]} name="description" id="Description" component={renderTextField} label="Description" multiline rows={5} palceholder="Enter description" variant="outlined" />
  <div style={{marginTop:'24px', width:'200px'}}>
    <Field  name="expiredat"  label="Expire At"  minDate={new Date()} component={renderDateField} variant="outlined" /> 
    </div>
</Grid>

  <Grid container style={{ marginTop:'24px'}} direction="row" justifyContent="space-around" alignItems="center">
    <PrimaryButton type="submit">Submit</PrimaryButton>
    <PrimaryButton onClick={props.handleClose}>Cancel</PrimaryButton>
  </Grid>
</form>



)
}

export default reduxForm({
form: "announcementForm", // a unique identifier for this form

})(AnnouncementForm);