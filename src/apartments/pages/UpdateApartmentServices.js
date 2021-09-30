import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader } from '../../shared/components/PageHeader'
import {PrimaryButton} from '../../shared/components/PrimaryButton'
import {SectionHeader} from '../../shared/components/SectionHeader'
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core'
import { useProfile } from '../../context/profile.context'
import communityAPI from '../../misc/axios-calls/communityAPI';
import { Progress } from '../../shared/components/Progress'
import { useCommunity } from '../../context/community.context'

export const UpdateApartmentServices = ({children,...props}) => {
const {user}=useProfile();
const {community,setCommunity}=useCommunity();
const communityid=community._id;
const history=useHistory();
const [enrolledServices,SetEnrolledService]=React.useState(null);
const [isLoading,setIsLoading]=React.useState(true)

const getCommunityDetails=async()=>{
  var apiBaseUrl = `/community/${communityid}`
  await communityAPI.get(apiBaseUrl )
  .then(function (response) {
  if (response.status === 200)
  {
  console.log(response.data);
  const communitydata= response.data;
  console.log(communitydata.paidservices);
  SetEnrolledService(communitydata.paidservices); 
  setIsLoading(false);
  
  }
  })
  .catch(function (error) {
  console.log(error);
  setIsLoading(false);
  
  });
  }
React.useEffect(() => {
  getCommunityDetails();
 
}, [])

const updateServiceDetails=async(data)=>{

  var apiBaseUrl = `/community/${communityid}`
  console.log(data);
  await communityAPI.put(apiBaseUrl,data )
  .then(function (response) {
  if (response.status === 200)
  {
  console.log( response.data);
  setCommunity(response.data)
  if(user.type==='admin')
  history.push('/dashboardA');
  else
  history.push('/dashboardR');
  
  }
  })
  .catch(function (error) {
  console.log(error);
  
  });
  }

  const handleSubmit=(e)=>{
  console.log(enrolledServices);
  const data={}
  data['paidservices']=enrolledServices;
  console.log(data);
  updateServiceDetails(data);
  
}
const handleBack=(e)=>{
props.handleBack();
}
const renderServiceInfo=()=>{
  return(
    <div>
       <h2> Selected Paid Services listed below</h2>
   
   <div style={{marginLeft:'400px', width:'500px'}}> <Paper  style={{padding:'40px'}}> <SectionHeader>Paid Services</SectionHeader>
     <Grid
     container
     direction="column"
     justifyContent="space-around"
     alignItems="flex-start"
   >
   <div>
     <FormControlLabel checked={enrolledServices.maintenance}
 value={enrolledServices.maintenance} onChange={(e)=>{SetEnrolledService((prevState)=>{
               return{...prevState, maintenance : !enrolledServices.maintenance}})}} control={<Checkbox color="primary" />}
     label="Maintenance Request"
     labelPlacement="end"
     />
     <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
     </div>
     <div>
     <FormControlLabel  checked={enrolledServices.visitor} value={enrolledServices.visitor}   onChange={(e)=>{SetEnrolledService((prevState)=>{
               return{...prevState, visitor :!enrolledServices.visitor}})}} control={<Checkbox color="primary" />}
     label="Visitor Management"
     labelPlacement="end"
     />
     <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
     </div>
     <div>
     
     <FormControlLabel checked={enrolledServices.polling} value={enrolledServices.polling}   onChange={(e)=>{SetEnrolledService((prevState)=>{
               return{...prevState, polling :!enrolledServices.polling}})}} control={<Checkbox color="primary" />}
     label="Polling"
     labelPlacement="end"
     />
     <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
     </div>
     <div>
     
     <FormControlLabel checked={enrolledServices.carpooling} value={enrolledServices.carpooling}  onChange={(e)=>{SetEnrolledService((prevState)=>{
               return{...prevState, carpooling :!enrolledServices.carpooling}})}} control={<Checkbox color="primary" />}
     label="Car Pooling"
     labelPlacement="end"
     />
     <span style={{color:'gray'}}> (₹ 0.10 per request)</span>
     </div>
     <div>
     
      <FormControlLabel    checked={enrolledServices.facility}  value={enrolledServices.facility}   onChange={(e)=>{SetEnrolledService((prevState)=>{
               return{...prevState, facility :!enrolledServices.facility}})}} control={<Checkbox color="primary" />}
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
    </div>
  )
}
return (

<>
  <PageHeader>{children}</PageHeader>
  {
    enrolledServices===null?
     <Progress/>:
     renderServiceInfo()
  }
</>
)
}