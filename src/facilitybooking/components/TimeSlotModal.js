import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button, DialogActions, DialogContent, TextField } from '@material-ui/core';




TimeSlotModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
export default function TimeSlotModal(props) {
  
    const [timeslot,setTimeSlot]=React.useState();


    const handleSubmit=()=>
    {
        props.addTimeSlot(timeslot);
    }

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogTitle id="simple-dialog-title">Select Time Slot</DialogTitle>
      <DialogContent>  <TextField  autoFocus
            margin="dense"  id="timeslot" name="timeslot"  fullWidth value={timeslot} onChange={(e)=>{setTimeSlot(e.target.value)}} label="Time Slot" variant="outlined"/>
        </DialogContent>
        <DialogActions>
            
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
    </Dialog>
  );
}


