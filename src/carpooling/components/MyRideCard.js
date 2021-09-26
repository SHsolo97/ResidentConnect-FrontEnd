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
export const  MyRideCard=({ride,...props})=> {
  const {user}=useProfile();
    const {_id,source,ridedatetime,destination,seats,amt,car,thumbnail}=ride;
    const startAddress=`${source.addressline}, ${source.area}, ${source.city},${source.state},${source.pincode}`;
    const destAddress=`${destination.addressline}, ${destination.area}, ${destination.city},${destination.state},${destination.pincode}`
    const ridedate=convertDate(ridedatetime);
    const ridetime=convertTime(ridedatetime);

    const cancelRide=()=>{
     props.cancelRide(_id);
      
    }
    const editRide=()=>{
      console.log('Edit ride');
    }
return (
<Paper elevation={5} style={{  marginLeft: '100px', padding:'10px', marginTop:'50px', width: '800px'}}>
  <Grid container column justifyContent="space-between" alignItems="center">

    <Grid container row justifyContent="space-between" alignItems="center">


      <Avatar style={{height:'100px',width:'100px'}} alt="complex" src={thumbnail} />
      <Grid item  >

      <Typography gutterBottom variant="h5" component="div">{car}</Typography>
    </Grid>
      <Grid item alignItems="flex-end">
        <Typography gutterBottom variant="body1" component="div">{amt}</Typography>
        <Typography gutterBottom variant="body1" component="div">{seats.available} Seats</Typography>
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
        {ride.status!='cancelled' && 
        <PrimaryButton onClick={editRide}>Edit Ride </PrimaryButton>
        }
         {ride.status!='cancelled'? 
          <PrimaryButton onClick={cancelRide}>Cancel Ride </PrimaryButton>
          :
          <PrimaryButton disabled>Cancelled </PrimaryButton>

       }
      </div>
    </Grid>


  </Grid>
</Paper>
);
}
