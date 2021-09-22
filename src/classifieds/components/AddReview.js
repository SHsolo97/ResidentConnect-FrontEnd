import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import { renderRatingField, renderTextField } from "../../misc/form-fields";
import classifiedAPI from "../../misc/axios-calls/classifiedAPI";
import { Alert } from "../../shared/components/Alert";
import { useAlertState } from "../../misc/custom-hooks";
import { Progress } from "../../shared/components/Progress";
import { useProfile } from "../../context/profile.context";
import { calculateAverageStars } from "../../misc/helpers";
import { useModelState } from "../../misc/custom-hooks";
import { connect } from 'react-redux';

import AddReviewModel from "./AddReviewModel";
import { fetchCommentsAndUsers,fetchClassifieds,fetchClassifiedById } from '../actions';
import { useCommunity } from "../../context/community.context";

export const AddReview = ({...props}) => {
  const { isOpen, open, close } = useModelState();
  const {community} =useCommunity();
  const createReview=()=>{
    open();
  }
  const setNewReview=(data)=>{
    props.fetchClassifieds(community._id);
    props.fetchClassifiedById(props.classified._id);
    props.fetchCommentsAndUsers(props.classified._id);
  }
  return (
    <div>
      <PrimaryButton onClick={createReview}> Write An Review</PrimaryButton>
        {isOpen &&
       <AddReviewModel classified={props.classified} setNewReview={setNewReview}  handleClose={close} open={open} />}
      </div>
  )
};
const mapStateToProps = state => {
  return { comments: state.comments };
};

export default connect(
  mapStateToProps,
  { fetchCommentsAndUsers,fetchClassifieds,fetchClassifiedById }
)(AddReview);