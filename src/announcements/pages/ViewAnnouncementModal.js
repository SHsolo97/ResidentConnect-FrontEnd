import React from "react";
import {PrimaryButton}from "../../shared/components/PrimaryButton";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";

import { Typography } from "@material-ui/core";


export const ViewAnnouncementModal = ({...props}) => {
    const {title,description}=props.announcement;
    
    
    return (
      
        <Dialog  maxWidth='md' fullWidth open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <SectionHeader>  {title}</SectionHeader>
          
        </DialogTitle>
        <DialogContent>
       
      <Typography variant="subtitle1" gutterBottom component="div">
          {description}
      </Typography>
        </DialogContent>
        <PrimaryButton style={{marginLeft:'450px', marginBottom:'10px', width:'50px'}} onClick={props.handleClose}>Close</PrimaryButton>
        </Dialog>
             
            
    )
}
