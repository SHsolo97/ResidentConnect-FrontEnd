import React from 'react'
import PrimaryButton from '../../../../shared/components/PrimaryButton';
import DialogActions from '@material-ui/core/DialogActions';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SectionHeader } from '../../shared/components/SectionHeader';
export const RejectReasonModel = ({...props}) => {
    return (
             <Dialog open={props.isOpen} maxWidth='md' onClose={props.close}>
                <SectionHeader>  Reject Request </SectionHeader>
                <DialogContent> Please provide Reject Reason  </DialogContent>
                <DialogActions>
                  
                    <PrimaryButton onClick={props.close} >
                        Close
                    </PrimaryButton>
                </DialogActions>
                </Dialog>
      
    )
}
