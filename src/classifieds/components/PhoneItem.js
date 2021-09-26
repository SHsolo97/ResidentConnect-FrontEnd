import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { Field} from "redux-form";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import {
  required,phoneNumber, renderTextField,renderSelectField,normalizePhone
} from "../../misc/form-fields";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const PhoneItem = ({ fields }) => {
  const classes = useStyles();

  const phoneItem = (phone) => {

    return (<div>
      <Field id="phonetype"  validate ={[required]} name={`${phone}.type`} component={renderSelectField} label="Type" variant="outlined" className={classes.formControl}>

      <MenuItem value='mobile'>Mobile</MenuItem>
        <MenuItem value='home'>Home</MenuItem>
        <MenuItem value='office'>Office</MenuItem>
      </Field>
      <Field id="phonenumber" normalize={normalizePhone} validate={[required,phoneNumber]} name={`${phone}.number`} style={{ margin: 8, width: '20ch' }} label="Number" component={renderTextField} variant="outlined" />
      <Field id="starttime" validate ={[required]}   name={`${phone}.starttime`} component={renderSelectField} label="Start Time" variant="outlined" className={classes.formControl}>

        {[...Array(12)].map((item, i) => <MenuItem value={i}> {i} </MenuItem>)}
      </Field>
      <Field id="starttimetype" validate ={[required]} name={`${phone}.starttimetype`} component={renderSelectField}  label="AM/PM" variant="outlined" className={classes.formControl}>


        <MenuItem value='AM'>AM</MenuItem>
        <MenuItem value='PM'>PM</MenuItem>
      </Field>
      <Field id="endtime"validate ={[required]} name={`${phone}.endtime`} component={renderSelectField}  label="End Time" variant="outlined" className={classes.formControl}>

{[...Array(12)].map((item, i) => <MenuItem value={i}> {i} </MenuItem>)}
</Field>
<Field id="endtimetype"  validate ={[required]} name={`${phone}.endtimetype`} component={renderSelectField}  label="AM/PM" variant="outlined" className={classes.formControl}>


<MenuItem value='AM'>AM</MenuItem>
<MenuItem value='PM'>PM</MenuItem>
</Field>
    </div>);
  }
  return (

    <ul style={{ listStyleType: 'none' }}>
      
      <li>
      
    
      <h3> Phone  <IconButton onClick={()=> {fields.push({})}}> <AddCircleIcon />       </IconButton> </h3>
      </li> 
      {fields.map((phone, index) =>
        <li key={index}>
        
        <Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
>
          {phoneItem(phone)}
          
          <IconButton onClick={() => {fields.remove(index)}} ><RemoveCircleIcon /> </IconButton>
        </Grid>
        </li>
      )}
    </ul>
  )
}