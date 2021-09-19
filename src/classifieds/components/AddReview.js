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
import AddReviewModel from "./AddReviewModel";

export const AddReview = ({newReview,classified}) => {
  const { isOpen, open, close } = useModelState();
  const createReview=()=>{
    open();
  }
  const setNewReview=(data)=>{
    newReview(data);
  }
  return (
    <div>
      <PrimaryButton onClick={createReview}> Write An Review</PrimaryButton>
        {isOpen &&
       <AddReviewModel  setNewReview={setNewReview} classified={classified} handleClose={close} open={open} />}
      </div>
  )
};
