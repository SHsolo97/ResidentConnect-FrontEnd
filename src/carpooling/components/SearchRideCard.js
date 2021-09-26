import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import {fetchMyRides} from '../actions/index';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import PrimaryButton from '../../shared/components/PrimaryButton';
import {convertDate,convertTime} from '../../misc/helpers';
import { useProfile } from '../../context/profile.context';
import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';

export const  SearchRideCard=({ride,...props})=> {
  const {user}=useProfile();
    const {_id,creator,source,ridedatetime,destination,seats,amt,car,thumbnail}=ride;
    const startAddress=`${source.addressline}, ${source.area}, ${source.city},${source.state},${source.pincode}`;
    const destAddress=`${destination.addressline}, ${destination.area}, ${destination.city},${destination.state},${destination.pincode}`
    const ridedate=convertDate(ridedatetime);
    const ridetime=convertTime(ridedatetime);
    const [buttonName,setButtonName]=React.useState('Request Ride');
    const requestRide=async()=>{


            var apiBaseUrl = `/carpoolings/riderequests/create`
            let data={};
            data['ride']=_id;
            data['seats']=props.requestesSeats;
            data['requestedby']=user._id;
            data['owner']=creator;
            data['status']='pending';
            await carPoolingAPI.post(apiBaseUrl, data)
              .then(function (response) {
                if (response.status === 201) {
        
                  console.log(response.data);
                  setButtonName('Pending');
                  
                }
        
              })
              .catch(function (error) {
                console.log(error);
              });
          
    }
return (
<Paper elevation={5} style={{  marginLeft: '100px', padding:'10px', marginTop:'50px', width: '800px'}}>
  <Grid container column justifyContent="space-between" alignItems="center">

    <Grid container row justifyContent="space-between" alignItems="center">


    {props.creator!=null && 
      <Avatar style={{height:'100px',width:'100px'}} alt="complex" src={props.creator.avatar} />
    }
      <Grid item >
      {props.creator!=null && 

      <Typography gutterBottom variant="h5" component="div">{props.creator.firstname} {props.creator.lastname}</Typography>
      }
      </Grid> 
      
      <Grid item alignItems="flex-end">
        <Typography gutterBottom variant="body1" component="div">{seats.available} Seats</Typography>
        <Typography gutterBottom variant="body1" component="div"> &#8377; {amt} per seat</Typography>
      </Grid>
    </Grid>
    
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">


      <div style={{paddingLeft:'30px',paddingTop:'10px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="primary" variant="dot">
          
        </Badge>
        <Typography style={{marginTop:'-15px',paddingLeft:'30px'}} variant="body2" gutterBottom>{startAddress}
          </Typography>
      </div>

      <Divider style={{paddingLeft:'20px',  paddingTop:'10px'}} orientation="vertical" />

      <div style={{paddingLeft:'30px',paddingTop:'10px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="secondary" variant="dot">

          <Typography style={{paddingLeft:'30px'}} variant="body2"  gutterBottom>{destAddress} </Typography>
        </Badge>
      </div>
    </Grid>
    <Grid style={{paddingLeft:'30px',paddingTop:'10px'}} container row justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {ridedate}, {ridetime}
      </Typography>
      <div>
     
          <PrimaryButton onClick={requestRide}>{buttonName} </PrimaryButton>

       
      </div>
    </Grid>


  </Grid>
</Paper>
);
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.ride.creator);
  return { creator: state.users.find(user => user._id === ownProps.ride.creator) };
};

export default connect(mapStateToProps)(SearchRideCard);