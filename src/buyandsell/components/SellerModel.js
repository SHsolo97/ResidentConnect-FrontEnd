import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Avatar, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { formatPhone } from '../../misc/helpers';

export const SellerModel = ({...props}) => {
    const seller=props.seller;
    const sellerAddress=props.sellerAddress;
    return (
        <div>
             <Dialog fullWidth minWidth='md' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Seller Details</DialogTitle>
        <DialogContent>
        <Grid
  container
  direction="column"
  justifyContent="space-around"
  alignItems="center"
>
        <Avatar  style={{ height: '100px', width: '100px' , objectFit:'cover' }} src={seller.avatar} />
        <Typography variant="h5" gutterBottom component="div"> {seller.firstname} {seller.lastname}  </Typography>
        <Typography variant="h5" gutterBottom component="div"> {formatPhone(seller.phone[0].number)}</Typography>
        <Typography variant="body1" gutterBottom component="div"> {sellerAddress.name}</Typography>

        <Typography variant="body1" gutterBottom component="div"> {sellerAddress.address.addressline}</Typography>
        <Typography variant="body1" gutterBottom component="div"> {sellerAddress.address.area}</Typography>
        <Typography variant="body1" gutterBottom component="div"> {sellerAddress.address.city}, {sellerAddress.address.state}, {sellerAddress.address.pincode}</Typography>

            </Grid>
        </DialogContent>
        <DialogActions>
       
        <Grid
  container
  direction="column"
  justifyContent="space-around"
  alignItems="center"
>
     <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          </Grid>
        </DialogActions>
      </Dialog>
        </div>
    )
}
