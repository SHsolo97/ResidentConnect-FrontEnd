import React from "react";
import {PrimaryButton} from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray,reduxForm } from "redux-form";
import {  renderTextField, renderDateTimeField,required,number,minValue,pinNumber } from "../../misc/form-fields";
import ImageUpload from '../components/ImageUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import  {SectionHeader}  from "../../shared/components/SectionHeader";
const CreateRideForm = ({...props}) => {
    
    let file=null;      
    const renderStopPoints = ({ fields, meta: { error } }) => (
                <div>
                   <h3> Stop Point 
                 <IconButton onClick={() => fields.push()}> <AddCircleIcon />       </IconButton> </h3>
                 
                  {fields.map((stoppoint, index) =>
                    <div key={index}>
                      
                      <Field
                        name={stoppoint}
                        type="text"

                        label={`Stop point #${index + 1}`}
                       style={{marginTop:'50px', width:'200px'}} 
                        component={renderTextField} variant="outlined" 
                        />

                    <IconButton onClick={() => fields.remove(index)} ><RemoveCircleIcon /> </IconButton>

                    </div>
                  )}
                  {error && <li className="error">{error}</li>}
                </div>
              )
              const addFile = (imagefile) => {
                file = imagefile;
              }         
              const submitForm=(formValues)=>{
                  props.onSubmit(formValues,file);
              }    
return (

<form onSubmit={props.handleSubmit(submitForm)}>
<Grid container   alignItems="center">

  <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
    <SectionHeader> Basic Details </SectionHeader>
  <Paper   style={{marginTop:'20px',width:'850px'}} elevation={2}>

  <Grid  style={{marginTop:'20px',marginLeft:'20px'}} container direction="column" justifyContent="flex-start" alignItems="flex-start">
    <Field name="car" label="Car Name" validate={[required]} style={{marginBottom:'50px',width:'200px'}} component={renderTextField} variant="outlined" />

    <Field style={{ marginTop:'250px', width:'780px'}} name="ridedatetime" label="Ride Date" 
            minDate={new Date()} component={renderDateTimeField} variant="outlined" />
    </Grid>
    <Grid container style={{marginLeft:'20px',marginTop:'20px',marginBottom:'20px'}} direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Field style={{marginTop:'20px', width:'200px'}} validate={[required,number,minValue(1)]} name="seats" component={renderTextField} label="Seats Offer"  variant="outlined" />
      <Field style={{ marginTop:'20px', marginLeft:'50px', width:'200px'}} validate={[required,number,minValue(1)]} name="amt" component={renderTextField} label="Price per Seat"  variant="outlined" />
    </Grid>
    </Paper>
    <SectionHeader> Source </SectionHeader>

    <Paper   style={{marginTop:'20px',width:'880px'}} elevation={2}>
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <Field  name="source.addressline" label="Address" validate={[required]} style={{marginTop:'50px', marginLeft:'20px',width:'800px'}} component={renderTextField} variant="outlined" />
      <Field name="source.area" label="Area" validate={[required]} style={{marginTop:'50px',marginLeft:'20px',   width:'800px'}} component={renderTextField} variant="outlined" />
      <Grid container style={{marginLeft:'20px',marginBottom:'20px'}}  direction="row" justifyContent="flex-start" alignItems="flex-start">

        <Field name="source.city" label="City" validate={[required]} style={{marginTop:'50px', width:'200px'}} component={renderTextField} variant="outlined" />
      <Field name="source.state" label="State" validate={[required]} style={{marginTop:'50px',marginLeft:'20px', width:'200px'}} component={renderTextField} variant="outlined" />
      <Field name="source.pincode" label="Pincode" validate={[required,pinNumber]} style={{marginTop:'50px',marginLeft:'20px', width:'200px'}} component={renderTextField} variant="outlined" />
    </Grid>
    </Grid>
    </Paper>
    <SectionHeader> Destination </SectionHeader>

    <Paper   style={{marginTop:'20px',width:'880px'}} elevation={2}>

    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
    <Field name="destination.addressline" label="Address" validate={[required]} style={{marginLeft:'20px',marginTop:'50px', width:'800px'}} component={renderTextField} variant="outlined" />
    <Field name="destination.area" label="Area" validate={[required]} style={{marginLeft:'20px',marginTop:'50px', width:'800px'}} component={renderTextField} variant="outlined" />

    <Grid container  style={{marginLeft:'20px',marginBottom:'20px'}}  direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Field name="destination.city" label="City" validate={[required]} style={{marginTop:'50px', width:'200px'}} component={renderTextField} variant="outlined" />
      <Field name="destination.state" label="State" validate={[required]} style={{marginTop:'50px',marginLeft:'20px', width:'200px'}} component={renderTextField} variant="outlined" />
      <Field name="destination.pincode" label="Pincode" validate={[required,pinNumber]} style={{marginTop:'50px',marginLeft:'20px', width:'200px'}} component={renderTextField} variant="outlined" />
      </Grid>
       </Grid>
       </Paper>

       <FieldArray name={`stoppoints`} component={renderStopPoints}/>

  </Grid>
  <ImageUpload addFile={addFile} name="file" id="classifieldIamge" errorText="Upload Image" />
  <Grid container direction="row" justifyContent="space-around" alignItems="center">
    <PrimaryButton type="submit">Submit</PrimaryButton>
    <PrimaryButton style={{marginLeft:'20px'}} onClick={props.handleClose}>Cancel</PrimaryButton>
  </Grid>
  </Grid>
</form>



)
}

export default reduxForm({
form: "rideForm", // a unique identifier for this form

})(CreateRideForm);