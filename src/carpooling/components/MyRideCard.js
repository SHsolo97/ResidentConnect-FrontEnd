import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import {convertDate,convertTime} from '../../misc/helpers';
import ShowPassangers from './ShowPassangers';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import {useModelState} from '../../misc/custom-hooks';
import RouteMapModel from '../../shared/components/Maps/RouteMapModal';
import {getGeoOrdinates} from '../../misc/map-helper';
export const  MyRideCard=({ride,...props})=> {
  const { isOpen, open, close } = useModelState();

    const {_id,source,stoppoints,ridedatetime,destination,seats,amt,car,thumbnail}=ride;
    const startAddress=`${source.addressline}, ${source.area}, ${source.city},${source.state},${source.pincode}`;
    const destAddress=`${destination.addressline}, ${destination.area}, ${destination.city},${destination.state},${destination.pincode}`
    const ridedate=convertDate(ridedatetime);
    const ridetime=convertTime(ridedatetime);
    const origin=startAddress.concat(', India');
    const dest=destAddress.concat(', India');
    const waypoints=stoppoints.length>2?stoppoints.slice(1,stoppoints.length-1):[];
    const zoom= 6;
   let center={lat:0,lng:0};
   const openRouteModel=()=>{
    console.log(origin);
    center=getGeoOrdinates({address:origin});
   open();
   }
    const cancelRide=()=>{
     props.cancelRide(_id);
      
    }
 
    const editRide=()=>{
      console.log('Edit ride');
    }
return (
<Paper elevation={1} style={{  marginLeft: '100px', padding:'10px', marginTop:'50px', width: '800px'}}>
  <Grid container column justifyContent="space-between" alignItems="center">

    <Grid container row  alignItems="center">


      <Avatar style={{height:'100px',width:'100px'}} alt="complex" src={thumbnail} />
     
      
      <Typography style={{marginLeft:'10px', fontWeight:'bold'}} gutterBottom variant="h5" component="div">{car}</Typography>
     

      <Grid item style={{marginLeft:'470px'}} >
        <Typography  style={{fontSize:'20px',fontWeight:'bold'}} gutterBottom variant="body1" component="div">&#8377;{amt.toLocaleString('en-IN')}</Typography>
        <Typography gutterBottom variant="body1" component="div">{seats.available} Seats</Typography>
      </Grid>
    </Grid>
    
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">


      <div style={{paddingLeft:'30px',paddingTop:'15px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="primary" variant="dot">
          
        </Badge>
        <Typography style={{marginTop:'-15px',paddingLeft:'30px',fontSize:'20px'}} variant="body2" gutterBottom>{startAddress}
          </Typography>
      </div>

      <Divider style={{marginLeft:'30px', height:'30px',width:'2px', background:'black'}} orientation="vertical" />

      <div style={{paddingLeft:'30px',paddingTop:'10px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="secondary" variant="dot">

          <Typography style={{marginTop:'-15px',fontSize:'20px',paddingLeft:'30px'}} variant="body2"  gutterBottom>{destAddress} </Typography>
        </Badge>
      </div>
    </Grid>
    <Grid style={{paddingLeft:'30px',paddingTop:'10px'}} container row justifyContent="space-between" alignItems="center">
      <Typography variant="body2" style={{fontSize:'20px'}} color="orange">
        {ridedate}, {ridetime}
      </Typography>
      <IconButton color="primary"  onClick={openRouteModel}>

      <LocationOnIcon/>
      </IconButton>
      <ShowPassangers rideid={ride._id}/>
      <div>
        {ride.status!=='cancelled' && 
        <PrimaryButton onClick={editRide}>Edit Ride </PrimaryButton>
        }
         {ride.status!=='cancelled'? 
          <PrimaryButton  style={{marginLeft:'10px'}}  onClick={cancelRide}>Cancel Ride </PrimaryButton>
          :
          <PrimaryButton  style={{marginLeft:'10px'}} disabled>Cancelled </PrimaryButton>

       }
      </div>
    </Grid>
       {isOpen &&
       <RouteMapModel origin={origin} destination={dest} waypoints={waypoints} zoom={zoom} center={center} handleClose={close} open={open} />
       }

  </Grid>
</Paper>
);
}
