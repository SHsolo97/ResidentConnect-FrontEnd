import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageHeader } from '../../shared/components/PageHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'
import { makeStyles } from  '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { useProfile } from '../../context/profile.context';
import {useApartment} from '../../context/apartment.context';
import { useCommunity } from '../../context/community.context';
import { TextField } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { SectionHeader } from '../../shared/components/SectionHeader';
import axios from 'axios';
import communityAPI from '../../misc/axios-calls/communityAPI';
import { Progress } from '../../shared/components/Progress';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import { useModelState } from '../../misc/custom-hooks';
import { SendTokenModal } from '../components/SendTokenModal';
const useStyles = makeStyles((theme) => ({
    root: {
    display: 'flex',
    marginLeft: theme.spacing(30),
    flexWrap: 'wrap',
    width:"100ch",
    marginTop:'5ch',
    padding: '1ch',
    borderRadius:'5ch',
    border: '2px solid orange'
    
    },
    textField: {
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(1),
    width: '50ch',
    
},
radioGroup:{
    marginLeft: theme.spacing(50),
    marginRight: theme.spacing(1),
    width: '100ch', 
}
    }));
    
export const ResidentApartmentSettings = () => {
    const classes=useStyles();
    const history=useHistory();
    const {user,setUser}=useProfile();
    const communityid=user.communities[0];
    const apartmentid=user.apartments[0].apartmentid;
    const [status,setStatus]= React.useState(null);
    const [isLoading,setIsLoading]=React.useState(true);
    const [apartment,setApartment]=React.useState(null);
    const [community,setCommunity]=React.useState(null);
    const { isOpen, open, close } = useModelState();

const editApartment=async()=>{
    console.log(status);
    const data={status : status};
    var apiBaseUrl = `/community/apartment/${apartmentid}`  
    await communityAPI.put(apiBaseUrl,data )
         .then(function (response) {
             if (response.status === 200)
  
            {
                console.log(response.data);
               
                history.push('/dashboardR');
               
              
            }
         })
         .catch(function (error) {
             console.log(error);
              
         });
  } 
  const getApartment=async()=>{
    console.log(status);
    const data={status : status};
    var apiBaseUrl = `/community/${communityid}/apartment/${apartmentid}`  
    await communityAPI.get(apiBaseUrl,data )
         .then(function (response) {
             if (response.status === 200)
  
            {
                console.log(response.data);
               
                setApartment(response.data);
               
                setStatus(response.data.status);
                setIsLoading(false);

            }
         })
         .catch(function (error) {
             console.log(error);
             setIsLoading(false);

         });
  } 
  const getCommunity=async()=>{
    console.log(status);
    const data={status : status};
    var apiBaseUrl = `/community/${communityid}`  
    await communityAPI.get(apiBaseUrl,data )
         .then(function (response) {
             if (response.status === 200)
  
            {
                console.log(response.data);
               
                setCommunity(response.data);
               
              
            }
         })
         .catch(function (error) {
             console.log(error);
             setIsLoading(false);

         });
  } 
 
  React.useEffect(() => {
    getCommunity().
    then(response=>{
        getApartment();

    })

  
      return () => {
          setApartment(null);
          setCommunity(null);
      }
  }, [])


  const renderApartmentDetails=()=>
  {
      return (
          <div>
        <RadioGroup className={classes.radioGroup} value={status} row aria-label="position" name="position" defaultValue="top" onChange={(e)=>{setStatus(e.target.value)}}>        
        <FormControlLabel id="radio_vacant"   value="vacant"  control={<Radio color="primary" />} label="Vacant" />        
        <FormControlLabel id="radio_rent"    value="rented out"  control={<Radio color="primary" />} label="Rented Out" />    
        <FormControlLabel id="radio_selfoccupied"   value="self-occupied"  control={<Radio color="primary" />} label="Self Occupied" />        
        <FormControlLabel id="radio_notsold"   disabled value="not-sold"  control={<Radio color="primary" />} label="Not Sold" />    
      </RadioGroup>
      <Box className={classes.root}>
            <SectionHeader>Basic Details</SectionHeader>
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
            <TextField name="tokenid" label="Token Number" value={apartment.token} className={classes.textField} placeholder="Token Number" fullWidth margin="normal"  aria-disabled />
            <Button  onClick={open} color="secondary">
        Send Token
      </Button>
            </Grid>
            <TextField name="aptnum" label="Apartment Number" value={apartment.aptnum} className={classes.textField} placeholder="Apartment Number" fullWidth margin="normal"  aria-disabled />
            <TextField name="address" label="Address" value={community.address.addressline} className={classes.textField} placeholder="Address Line" fullWidth margin="normal"  aria-disabled />
            <TextField name="area" label="Area" value={community.address.area} className={classes.textField} placeholder="Area" fullWidth margin="normal"  aria-disabled />
            <TextField name="city" label="City" value={community.address.city} className={classes.textField} placeholder="City" fullWidth margin="normal"  aria-disabled />
            <TextField name="state" label="State" value={community.address.state} className={classes.textField} placeholder="State" fullWidth margin="normal"  aria-disabled />
            <TextField name="pincode" label="Pin Code" value={community.address.pincode} className={classes.textField} placeholder="PinCode" fullWidth margin="normal"  aria-disabled />

        </Grid>
        </Box>
                <PrimaryButton onClick={handleSubmit}> Update </PrimaryButton>
                </div>
      )
  }

  const handleSubmit=(event)=>
    {
        
        editApartment();
    }
    return (
        <div>
            <PageHeader> Apartment Details</PageHeader>
            {apartment===null ?
     <Progress/>:
     renderApartmentDetails()
    
    }
        {isOpen &&
        <SendTokenModal handleClose={close} open={open} aptnum={apartment.aptnum}  token={apartment.token} />}
           
        </div>
    )
}
