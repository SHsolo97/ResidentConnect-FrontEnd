import React from 'react'
import PrimaryButton from '../../shared/components/PrimaryButton';
import DialogActions from '@material-ui/core/DialogActions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { SectionHeader } from '../../shared/components/SectionHeader';
import TextField from '@mui/material/TextField';

export const RejectReasonModel = ({...props}) => {
    const[reason,setReason]=React.useState('');
    const rejectRide=()=>{
        props.rejectRide(reason);
        props.handleclose();
    }
    return (
             <Dialog open={props.open} maxWidth='md' fullWidth onClose={props.handleclose}>
                <SectionHeader>  Reject Request </SectionHeader>
                <DialogContent> Please provide Reject Reason 
                    
                <TextField label="Rejection Reason" variant="standard" value={reason} 
                onChange={(e)=>{setReason(e.target.value)}} />

         </DialogContent>
                <DialogActions>
                <PrimaryButton onClick={rejectRide} >
                        Submit
                    </PrimaryButton>
                    <PrimaryButton onClick={props.handleclose} >
                        Close
                    </PrimaryButton>
                </DialogActions>
                </Dialog>
    )
}
