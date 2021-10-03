import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import RouteMap from './RouteMap';

const useStyles = makeStyles((theme) => ({
    mapContainer :{
        height: '15rem',
        width: '100%'
      }
  }));
export default function RouteMapModel({...props}) {
    const classes = useStyles();
   // console.log(props.coordinates);
   const{origin,destination,waypoints, zoom,center}=props;
  //  const origin="Boston, MA"
  //  const destination='Seattle, WA';
  //  const waypoints=['Chicago'];
  //  const zoom= 6;
  // const center= { lat: 41.85, lng: -87.65 };
  return (
 
      <Dialog open={props.open} onClose={props.handleClose}  maxWidth='md'  fullWidth  >
        <DialogTitle >Route Map</DialogTitle>
        <DialogContent>
        <div clasSName={classes.mapContainer}> 
       
        {/* <Map  width='800px' height='800px' center={props.coordinates} zoom={10} /> */}
         <RouteMap   width='800px' height='800px' origin={origin}  destination={destination} waypoints={waypoints} zoom={zoom} center={center}/>
        </div>
        </DialogContent>
        <Button onClick={props.handleClose} color="primary"> Close  </Button>
        </Dialog>
  )
}