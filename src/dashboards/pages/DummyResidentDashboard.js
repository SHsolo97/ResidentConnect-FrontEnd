import React from 'react'
import { useProfile } from '../../context/profile.context'
import { useApartment } from '../../context/apartment.context';
import { Divider } from '@mui/material';
import { useCommunity } from '../../context/community.context';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
const DummyResidentDashboard = ({...props}) => {
    const {user}=useProfile();
    const {community} = useCommunity();
    const {apartment} = useApartment();

    return (
        <Dialog  maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Resident Details
          
        </DialogTitle>
        <DialogContent>
        <div>user id={user._id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        <br/>
   
        {user.apartments.map((apartment)=>            
         <> <div>community id: {apartment.communityid}</div>
            <div>apartment id: {apartment.apartmentid}</div>
           <br/>
           </>
        )}
        <Divider/>
         <div>Current community id: {community._id}</div>
          <div>Current apartment id: {apartment._id}</div>
           <br/>
        </DialogContent>
        <PrimaryButton style={{marginLeft:'450px', marginBottom:'10px', width:'50px'}} onClick={props.handleClose}>Close</PrimaryButton>
        </Dialog>
        
         
    );

    
}

export default DummyResidentDashboard

