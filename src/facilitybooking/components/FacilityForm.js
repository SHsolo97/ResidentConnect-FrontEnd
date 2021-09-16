import React from 'react'

import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SectionHeader } from '../../shared/components/SectionHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {Field,FieldArray, reduxForm} from 'redux-form';
import {renderRatingField,renderTextField,renderRadioGroup,renderSelectField,renderCheckbox} from '../../misc/form-fields';
import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import {Alert} from '../../shared/components/Alert';
import {useAlertState} from '../../misc/custom-hooks';
import {Progress} from '../../shared/components/Progress';
import { useProfile } from '../../context/profile.context';
import Checkbox from '@material-ui/core/Checkbox';
import { FreeBreakfastOutlined } from '@material-ui/icons';



export const FacilityForm =props => {
    const[counter,setCounter]=React.useState(0);

       const renderDay = ({ fields }) => (
        
        <ul  style={{listStyleType:'none'}}>
          <li>
              {counter <7  &&
            <PrimaryButton type="button" onClick={() => { 
                  setCounter(counter=>counter+1);
                 fields.push({})}}>Add Day</PrimaryButton>
            }
          </li>
          {fields.map((timings, index) =>
            <li key={index}>
              <PrimaryButton onClick={() =>{
                  setCounter(counter=>counter-1);
                  fields.remove(index)
              } }>Remove Day"</PrimaryButton>
              <h4>Day #{index + 1}</h4>
              <div>
        <Field
          
          name={`${timings}.isclosed`}   control={<Checkbox color="primary" />} 
          labelPlacement="end" component={renderCheckbox} label="Closed" />
      </div> <div>
        <Field name={`${timings}.opentime`} id="opentime" style={{ width: '20ch'}} component={renderTextField} label="Open Time" variant="outlined" />
      </div>
      <div>
        <Field name={`${timings}.closetime`} id="closetime" style={{ width: '20ch'}} component={renderTextField} label="close Time" variant="outlined" />
      </div>
            </li>
          )}
        </ul>
      )
    
    
return (
<div>

  <form>
    <Grid container direction="column" justifyContent="space-evenly" alignItems="flex-start">
      <div>
        <Field id="name" name="name" style={{ width: '100ch'}} component={renderTextField} label="Facility Name" variant="outlined" />
      </div>
      <div>
        <Field id="details" name="details" style={{ width: '100ch'}} component={renderTextField} label="Facility Details" variant="outlined" />
      </div>
      <div>

        <Field name="bookingtype" component={renderRadioGroup}>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <FormControlLabel value="free" control={<Radio color="primary" />} label="Free" />
            <FormControlLabel value="day" control={<Radio color="primary" />} label="Day" />
            <FormControlLabel value="slot" control={<Radio color="primary" />} label="Slot" />
          </Grid>
        </Field>
      </div>
      <div>
        <Field id="rent" name="rent" style={{ width: '30ch'}} component={renderTextField} label="Facility Rent" variant="outlined" />
      </div>

     <FieldArray name="timings" component={renderDay}/>

     
          

    </Grid>


  </form>
</div>
)
}
export default reduxForm({
form: 'facilityForm'// a unique identifier for this form

})(FacilityForm)