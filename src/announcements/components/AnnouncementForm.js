import React, { useState } from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray,reduxForm } from "redux-form";
import { renderRatingField, renderTextField, renderDateField,required } from "../../misc/form-fields";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import Stack from '@mui/material/Stack';

const AnnouncementForm = ({...props}) => {


return (

<form onSubmit={props.handleSubmit(props.onSubmit)}>
<Grid spacing={3}
  container
  direction="column"
  justifyContent="center"
  alignItems="center"
><Field style={{marginTop:'20px', width:'800px'}} validate={[required]} name="title" id="title" component={renderTextField} label="Title" palceholder="Enter Title" variant="outlined" />
  <Field style={{ marginTop:'20px', width:'800px'}} validate={[required]} name="description" id="Description" component={renderTextField} label="Description" multiline rows={5} palceholder="Enter description" variant="outlined" />
  <Field style={{marginTop:'50px', width:'800px'}} name="expiredat"  label="Expire At"  minDate={new Date()} component={renderDateField} variant="outlined" /> 
</Grid>

  <Grid container direction="row" justifyContent="space-around" alignItems="center">
    <PrimaryButton type="submit">Submit</PrimaryButton>
    <PrimaryButton onClick={props.handleClose}>
      {" "}
      Cancel{" "}
    </PrimaryButton>
  </Grid>
</form>



)
}

export default reduxForm({
form: "announcementForm", // a unique identifier for this form

})(AnnouncementForm);