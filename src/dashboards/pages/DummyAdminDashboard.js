import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import {PrimaryButton}from '../../shared/components/PrimaryButton';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
const DummyAdminDashboard = ({...props}) => {
    const {user}=useProfile();

    const {communityList}=useCommunity();
  
    return (
        <Dialog  maxWidth='sm' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Admin Details
          
        </DialogTitle>
        <DialogContent>
        <h2> User  Details</h2>

   <div>id={user._id}</div>
        
        <br/>
        <div>Email={user.email}</div>
        
        <br/>
        <div>Type={user.type}</div>
        
        <br/>
        <div>uid={user.uid}</div>
        
        <br/>
      
       { communityList.map((community)=>           
                    <>
                   <h2> Community  Details</h2>
                    <div> community id: {community.id}</div>
                    <br/>
                    <div> community name: {community.name}</div>
                    <br/>
                    <div> community Builder: {community.builder}</div>

                    <br/>
                    </>)        
}
        </DialogContent>
        <PrimaryButton style={{marginLeft:'450px', marginBottom:'10px', width:'50px'}} onClick={props.handleClose}>Close</PrimaryButton>
        </Dialog>
        
         
    );

    
}

export default DummyAdminDashboard
