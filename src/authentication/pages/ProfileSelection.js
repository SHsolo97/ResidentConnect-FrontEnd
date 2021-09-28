import React from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';

import { useHistory } from 'react-router-dom';
import { useCommunity } from '../../context/community.context';
import { useApartment } from '../../context/apartment.context';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import communityAPI from '../../misc/axios-calls/communityAPI';
import { useModelState } from "../../misc/custom-hooks";
import { RegisterApartmentModel } from '../components/RegisterApartmentModel';


export const ProfileSelection = () => {
const {user}=useProfile();
const { isOpen, open, close } = useModelState();


const {setCommunity,communityList} = useCommunity();
const {setApartment,apartmentList} = useApartment();

const history=useHistory();
const handleSubmit=()=>{
 
if(user.type==='admin')

if(user.profilecompletion)
history.push('/dashboardA');
else
history.push('/settingsA');
else
if(user.profilecompletion)
history.push('/dashboardR');
else
history.push('/settingsR');

}
const getCommunityDetails=async (communityId)=>{
  console.log(communityId);
var apiBaseUrl = `/community/${communityId}`;
let communityinfo=null;




const data=await communityAPI.get(apiBaseUrl )
    .then(function (response) {
        if (response.status === 200)
       {           
         
        communityinfo=response.data;
           if(communityinfo!=null)
           {
        

            const communitydata=communityinfo;
            
            console.log(communitydata);
            setCommunity(communitydata); 
           }     
          
           
          
        
        }
  
    })
    .catch(function (error) {
        console.log(error);
      

    });
    return data;
   }
const getApartmentDetails=async (apartmentid)=>{
  console.log(apartmentid);
var apiBaseUrl = `/community/apartments`;
let apartmentInfo=null;

const searchQuery={
  "_id":apartmentid
}

console.log(searchQuery);
const data=await communityAPI.post(apiBaseUrl,searchQuery )
    .then(function (response) {
        if (response.status === 200)
       {           
         
           apartmentInfo=response.data.apartments;
           if(apartmentInfo.length>0)
           {
        
            const apartmentdata=apartmentInfo[0];
            console.log(apartmentdata);
            setApartment(apartmentdata);   
               getCommunityDetails(apartmentdata.communityid)
 
           }     
          
           
         
        
        }
  
    })
    .catch(function (error) {
        console.log(error);
       
    });
    return data;
   }




const renderCommunityList =()=>{

  return communityList.map((community)=>

      <>
        <Paper elevation={3} style={{padding:'20px', width:'400px'}}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="center">
            <Radio value={community.id} color="primary" />
            <div>
              <div> {community.name}</div>
              <br />
              <div> {community.builder}</div>

              <br />
            </div>
          </Grid>
        </Paper>
      </>)

}

const selectApartment=(event)=>{
  const val=event.target.value;
  console.log(val);
  if(val==='add')
  {
    open();
   
  }
  else
  {
    getApartmentDetails(val);
    
    
  }

}
const selectCommunity=(event)=>{
  const val=event.target.value;
  console.log(val);
  if(val==='add')
  {
    open();
   
  }
  else
  {
    getCommunityDetails(val);
    
    
  }
}
const renderApartmentList =()=>{

 console.log(apartmentList);
 
  return apartmentList.map((apartment) =>
  <>
    <Paper  elevation={3} style={{marginTop:"50px",padding:'20px', width:'400px'}}>
      <Grid  container direction="row" justifyContent="flex-start" alignItems="center">
      <Radio value={apartment.id} color="primary" />

    
        <div>{apartment.aptnum}</div>
        <br />
      </Grid>
    </Paper>
  </>)

}

const renderAddApartment=()=>{
  return (
  <div>
  <Paper elevation={3} style={{padding:'20px', marginTop:"50px",width:'400px'}}>
  <Grid  container direction="row" justifyContent="flex-start" alignItems="center">
  <Radio value="add"color="primary" />
    <div>Add Apartment</div>
    <br />
  </Grid>
  </Paper>
  </div>);
  }

return (
<Grid style={{marginTop:"200px"}} container direction="column" justifyContent="flex-start" alignItems="center">
  
  <PageHeader > Select Profile </PageHeader>


  { (user.type==='admin')
      ? 
      <RadioGroup row name="selectProfile" onChange={selectCommunity} >
            <Grid container direction="column" justifyContent="space-around" alignItems="center">
           {renderCommunityList()}
      </Grid>
      </RadioGroup>
      :    
      <> 
       <RadioGroup row name="selectProfile" onChange={selectApartment} >
       <Grid container direction="column" justifyContent="space-around" alignItems="center">
       {renderApartmentList()}
        {renderAddApartment()}
      </Grid>

      </RadioGroup>

      </>
      }
  
 
  {isOpen &&
    <RegisterApartmentModel open={open} handleClose={close} />
  }
     

  <PrimaryButton style={{marginTop:"50px"}} onClick={handleSubmit}> Next </PrimaryButton>

</Grid>);
}