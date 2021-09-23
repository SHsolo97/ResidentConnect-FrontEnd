import React, { useState } from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray,reduxForm } from "redux-form";
import { renderRatingField, renderTextField, renderDateField,required } from "../../misc/form-fields";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {useProfile} from "../../context/profile.context";
import {useCommunity} from "../../context/community.context";
import announcementAPI from '../../misc/axios-calls/announcementAPI';
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
