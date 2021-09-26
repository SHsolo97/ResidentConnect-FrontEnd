import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import PrimaryButton from '../../shared/components/PrimaryButton';
import {convertDate,convertTime} from '../../misc/helpers';
import { useProfile } from '../../context/profile.context';
import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';

export const  MyRideRequestCard=({...props})=> {
  const {user}=useProfile();
  
 
  
    
  
    const renderData=()=>{
      if( typeof props.ridereq === "undefined")
    
        return null;
        if(  props.ridereq === null)
          return null;
      return(
        <Paper elevation={5} style={{  marginLeft: '100px', padding:'10px', marginTop:'50px', width: '800px'}}>
  <Grid container column justifyContent="space-between" alignItems="center">

    <Grid container row justifyContent="space-between" alignItems="center"> 
    {typeof props.owner !== "undefined" &&
      <Avatar style={{height:'100px',width:'100px'}} alt="complex" src={props.owner.avatar} />  
    }

      <Grid item >
      {typeof props.owner !== "undefined" &&
        <Typography gutterBottom variant="h5" component="div">{props.owner.firstname} {props.owner.lastname}</Typography>
      }
      </Grid> 
      
      <Grid item alignItems="flex-end">
        <Typography gutterBottom variant="body1" component="div">{props.ridereq.seats} Seats</Typography>
        <Typography gutterBottom variant="body1" component="div"> &#8377; {props.ridereq.ride!=null? props.ridereq.ride.amt:0} per seat</Typography>
      </Grid>
    </Grid>
    
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">


      <div style={{paddingLeft:'30px',paddingTop:'10px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="primary" variant="dot">
          
        </Badge>
        <Typography style={{marginTop:'-15px',paddingLeft:'30px'}} variant="body2" gutterBottom>
        {props.ridereq.ride.source.addressline}, {props.ridereq.ride.source.area}, {props.ridereq.ride.source.city},{props.ridereq.ride.source.state},{props.ridereq.ride.source.pincode}
          </Typography>
      </div>

      <Divider style={{paddingLeft:'20px',  paddingTop:'10px'}} orientation="vertical" />

      <div style={{paddingLeft:'30px',paddingTop:'10px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="secondary" variant="dot">

          <Typography style={{paddingLeft:'30px'}} variant="body2"  gutterBottom>
          {props.ridereq.ride.destination.addressline}, {props.ridereq.ride.destination.area}, {props.ridereq.ride.destination.city},{props.ridereq.ride.destination.state},{props.ridereq.ride.destination.pincode}

      </Typography>
        </Badge>
      </div>
    </Grid>
    <Grid style={{paddingLeft:'30px',paddingTop:'10px'}} container row justifyContent="space-between" alignItems="center">
      <Typography variant="body2" color="text.secondary">
        {convertDate(props.ridereq.ride.ridedatetime)}, {convertTime(props.ridereq.ride.ridedatetime)}
      </Typography>
      <div>
     
          <PrimaryButton disabled>{props.ridereq.status} </PrimaryButton>
          {props.ridereq.status==='pending' &&
          <PrimaryButton >Cancel Request </PrimaryButton>}
            {props.ridereq.status==='rejected' &&  props.ridereq !=null &&
          <Typography variant="body2" color="text.secondara"> {props.ridereq.rejectionreason} </Typography>}
    {props.ridereq.status==='rejected' &&  props.ridereq ==null &&
          <Typography variant="body2" color="text.secondara"> No Reason for rejection </Typography>}
       
      </div>
    </Grid>


  </Grid>
</Paper>
      )
    }
return (
  <div>
  {renderData()}
  </div>
);
}


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.ridereq.owner);
  console.log(state.users);
  return { 
   
    

    owner:state.users.find(user => user._id === ownProps.ridereq.owner) 
};
};

export default connect(mapStateToProps)(MyRideRequestCard);