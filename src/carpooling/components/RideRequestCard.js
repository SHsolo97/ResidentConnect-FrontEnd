import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import {fetchRideById,fetchUser} from '../actions/index';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Avatar from '@mui/material/Avatar';
import PrimaryButton from '../../shared/components/PrimaryButton';
import {convertDate,convertTime} from '../../misc/helpers';
import { useProfile } from '../../context/profile.context';

export const  RideRequestCard=({...props})=> {
  const {user}=useProfile();
  
  let startAddress=null;
  let destAddress= null;
  let ridedate=null;
  let ridetime=null;
  React.useEffect(() => {
    
        props.fetchRideById(props.ridereq.rideid);    
        props.fetchUser(props.ridereq.requestedby);     
      
     
    }, [props.ridereq])

    if(props.ride!=null)
    {
      let {_id,source,ridedatetime,destination,seats,amt,car,thumbnail}=props.ride;
      startAddress=`${source.addressline}, ${source.area}, ${source.city},${source.state},${source.pincode}`;
      destAddress=`${destination.addressline}, ${destination.area}, ${destination.city},${destination.state},${destination.pincode}`
      ridedate=convertDate(ridedatetime);
      ridetime=convertTime(ridedatetime);
    }
    const [approvebuttonName,setApproveButtonName]=React.useState('Approve');
    const [rejectbuttonName,setRejectbuttonName]=React.useState('Reject');

    
    const approveRequest=()=>{
       props.approveRide(props.ridereq._id);
    }
    const RejectRequest=()=>{
      props.rejectRide(props.ridereq._id);

    }
return (
<Paper elevation={5} style={{  marginLeft: '100px', padding:'10px', marginTop:'50px', width: '800px'}}>
  <Grid container column justifyContent="space-between" alignItems="center">

    <Grid container row justifyContent="space-between" alignItems="center"> 
    {props.requester!=null &&
      <Avatar style={{height:'100px',width:'100px'}} alt="complex" src={props.requester.avatar} />  
    }

      <Grid item >
      {props.requester!=null &&
        <Typography gutterBottom variant="h5" component="div">{props.requester.firstname} {props.requester.lastname}</Typography>
      }
      </Grid> 
      
      <Grid item alignItems="flex-end">
        <Typography gutterBottom variant="body1" component="div">{props.ridereq.seats} Seats</Typography>
        <Typography gutterBottom variant="body1" component="div"> &#8377; {props.ride!=null? props.ride.amt:0} per seat</Typography>
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
     
          <PrimaryButton onClick={approveRequest}>{approvebuttonName} </PrimaryButton>
          <PrimaryButton onClick={RejectRequest}>{rejectbuttonName} </PrimaryButton>

       
      </div>
    </Grid>


  </Grid>
</Paper>
);
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.user);
  return { ride: state.ride ,
           requester:state.users.find(user => user._id === ownProps.ridereq.requestedby) };
};

export default connect(mapStateToProps,{fetchRideById,fetchUser})(RideRequestCard);