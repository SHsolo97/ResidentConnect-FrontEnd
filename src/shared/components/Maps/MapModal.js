import React, {useState} from 'react';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Map from './Map';

const useStyles = makeStyles((theme) => ({
    mapContainer :{
        height: '15rem',
        width: '100%'
      }
  }));
export default function MapModel({...props}) {
    const classes = useStyles();
    console.log(props.coordinates);
  return (
 
      <Dialog open={props.open} onClose={props.handleClose}  maxWidth='md'  fullWidth  >
        <DialogTitle >Location in Map</DialogTitle>
        <DialogContent>
        <div clasSName={classes.mapContainer}> 
        <Map  width='800px' height='800px' center={props.coordinates} zoom={10} />

        </div>
        </DialogContent>
        <Button onClick={props.handleClose} color="primary"> Close  </Button>
        </Dialog>
  )
}