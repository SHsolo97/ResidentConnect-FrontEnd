import React from 'react'
import { useHistory } from 'react-router'
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'
import {SectionHeader} from '../../shared/components/SectionHeader'
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core'

export const ApartmentServices = ({children,...props}) => {
const history=useHistory();

const handleSubmit=(e)=>{
history.push('/settingsR');
}
const handleBack=(e)=>{
props.handleBack();
}
return (

<>
  <PageHeader>{children}</PageHeader>
  <h2>Congralutation!!!. Your Registration is completed.
    Select paid services below,</h2>
   
<div style={{marginLeft:'400px', width:'500px'}}> <Paper  style={{padding:'40px'}}> <SectionHeader>Paid Services</SectionHeader>
  <Grid
  container
  direction="column"
  justifyContent="space-around"
  alignItems="flex-start"
>
<div>
  <FormControlLabel value="maintenance" control={<Checkbox color="primary" />}
  label="Maintenance Request"
  labelPlacement="end"
  />
  <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
  </div>
  <div>
  <FormControlLabel value="visitor" control={<Checkbox color="primary" />}
  label="Visitor Management"
  labelPlacement="end"
  />
  <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
  </div>
  <div>
  
  <FormControlLabel value="polling" control={<Checkbox color="primary" />}
  label="Polling"
  labelPlacement="end"
  />
  <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
  </div>
  <div>
  
   <FormControlLabel value="facility" control={<Checkbox color="primary" />}
  label="Facility Booking"
  labelPlacement="end"
  />
  <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
  </div>
  </Grid>
  </Paper>
  </div>


  <PrimaryButton onClick={handleBack}> Back </PrimaryButton>
  <PrimaryButton onClick={handleSubmit}> Finish </PrimaryButton>
</>
)
}