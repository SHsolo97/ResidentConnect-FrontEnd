import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import {PrimaryButton}from '../../shared/components/PrimaryButton';

export const DeleteAdvertModal = ({...props}) => {
    return (
        <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >      
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete Advert?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <PrimaryButton onClick={props.handleDelete} color="primary">
            Yes
          </PrimaryButton>
          <PrimaryButton onClick={props.handleClose} color="primary" autoFocus>
            No
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    )
}
