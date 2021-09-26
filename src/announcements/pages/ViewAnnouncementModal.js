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
        <Dialog  maxWidth='xl' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <SectionHeader> View Announcement </SectionHeader>
          
        </DialogTitle>
        <DialogContent>
        <Typography variant="subtitle1" gutterBottom component="div">
          {title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div">
          {description}
      </Typography>
        </DialogContent>
        <PrimaryButton onClick={props.handleClose}>
                    {" "}
                    Close{" "}
                  </PrimaryButton>
        </Dialog>
             
            
    )
}
