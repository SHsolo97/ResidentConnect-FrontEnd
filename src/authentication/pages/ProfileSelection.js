import React,{useState} from 'react'
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';

import { useHistory } from 'react-router-dom';
import { useCommunity } from '../../context/community.context';
import { useApartment } from '../../context/apartment.context';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Progress} from '../../shared/components/Progress';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import communityAPI from '../../misc/axios-calls/communityAPI';
import { useModelState } from "../../misc/custom-hooks";
import { RegisterApartmentModel } from '../components/RegisterApartmentModel';
import {Alert} from '../../shared/components/Alert';
import {useAlertState}  from '../../misc/custom-hooks';

export const ProfileSelection = () => {
const {user,isLoading,setIsLoading}=useProfile();
const { isOpen, open, close } = useModelState();
const {setCommunity,communityList} = useCommunity();
const {setApartment,apartmentList} = useApartment();

const { isAlertOpen, openAlert, closeAlert } = useAlertState();

const [isError,setError]=useState(null);
const [alertMessage, setAlertMessage]=useState(null);
const [alertType,setAlertType]=useState(null);
const [communityId,setCommunityId] = useState(null);
const [apartmentId,setApartmentId] = useState(null);

const history=useHistory();
const handleSubmit=()=>{
  if(user.type==='admin')
  {
    if(communityId!=null)
    {
      setIsLoading(true);

      const res=communityList.filter(community=>community._id===communityId);
      setCommunity(res[0]);
            setIsLoading(false);

    }
    else
    {
      setError("Please Select Community");
      setAlertMessage("Please Select Community");
      setAlertType('error');
      openAlert();
      return;
    }
  }
  else
  {
    if(apartmentId!=null)
    {
      setIsLoading(true);
      console.log(apartmentId);
      console.log(apartmentList);
      const apartments=apartmentList.filter(apartment=>apartment._id===apartmentId);
      setApartment(apartments[0]);
      console.log(apartments);
      const communities=communityList.filter(community=>community._id===apartments[0].communityid);
      console.log(communities);

      setCommunity(communities[0]);
            setIsLoading(false);

    // setIsLoading(true);
    // getApartmentDetails(apartmentId).then(apartmentdata=>{
    //   console.log(apartmentdata);
    //   setApartment(apartmentdata); 
    // //   setCommunityId(apartmentdata.communityid)  
    // //   getCommunityDetails(apartmentdata.communityid)
    // }

    // )
    }
    else
    {
      setError("Please Select Apartment");
      setAlertMessage("Please Select Apartment");
      setAlertType('error');
      openAlert();
      return;
    }
  }
  
  if(!isLoading  && user.type==='admin')
    {
    if(user.profilecompletion)
      history.push('/dashboardOA');
    else
      history.push('/settingsA');   
    }
    
    if(!isLoading  && user.type==='resident')
  {
    if(user.profilecompletion)
      history.push('/dashboardOR');
    else
      history.push('/settingsR');
  }

}
const getCommunityDetails=async (communityId)=>{
 // console.log(communityId);
var apiBaseUrl = `/community/${communityId}`;
let communityinfo=null;




await communityAPI.get(apiBaseUrl )
    .then(function (response) {
        if (response.status === 200)
       {           
         
        communityinfo=response.data;
           if(communityinfo!=null)
           {
        

            const communitydata=communityinfo;
            
           console.log(communitydata);
            setCommunity(communitydata); 
            
            setIsLoading(false);
           }     
          
           
          
        
        }
  
    })
    .catch(function (error) {
        console.log(error);
      

    });

   }
const getApartmentDetails=async (apartmentid)=>{
 // console.log(apartmentid);
var apiBaseUrl = `/community/apartments`;
let apartmentInfo=null;

const searchQuery={
  "_id":apartmentid
}

//console.log(searchQuery);
return await communityAPI.post(apiBaseUrl,searchQuery )
    .then(function (response) {
        if (response.status === 200)
       {           
         
           apartmentInfo=response.data.apartments;
           if(apartmentInfo.length>0)
           {
        
            const apartmentdata=apartmentInfo[0];
            return apartmentdata;
           
           }     
          
           return [];
         
        
        }
        return null;
    })
    .catch(function (error) {
        console.log(error);
        return null;
    });
    
   }




const renderCommunityList =()=>{

  return communityList.map((community)=>

      <>
        <Paper key={community._id} elevation={3} style={{padding:'20px', width:'400px'}}>
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
  //console.log(val);
  if(val==='add')
  {
    open();
   
  }
  else
  {
    setApartmentId(val);
    
    
    
  }

}
const selectCommunity=(event)=>{
  const val=event.target.value;
  //console.log(val);
  if(val==='add')
  {
    open();
   
  }
  else
  {
    //getCommunityDetails(val);
    setCommunityId(val)
    
  }
}
const renderApartmentList =()=>{

 //console.log(apartmentList);
 
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

  const renderData=()=>{
    return(<Grid style={{marginTop:"200px"}} container direction="column" justifyContent="flex-start" alignItems="center">
  
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
    { isAlertOpen?
  <Alert open={isAlertOpen} handleClose={closeAlert} type={alertType}>{alertMessage}</Alert>
  :
  null}
  </Grid>)
  }


return (
  <div>
  {isLoading ? <Progress/> : 
    renderData()}
  </div>
);
}