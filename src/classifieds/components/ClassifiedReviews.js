import React from 'react'
import PrimaryButton from '../../shared/components/PrimaryButton'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import ReviewList from './ReviewList';
import {useModelState} from '../../misc/custom-hooks';
import AddReviewModel from './AddReviewModel';
import { createStore, applyMiddleware, compose } from 'redux';

export const ClassifiedReviews = ({classified}) => {
  const { isOpen, open, close } = useModelState();

  const createReview=()=>{
    open();
  }
const renderAverageRatingCard=()=>
{
return(

<Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">
  <div style={{marginTop:'50px', fontSize:"48px",color:'blue'}}> {classified.ratings._avgstar}/5</div>
  <Rating name="avgrating" precision={0.5} value={classified.ratings._avgstar} readOnly style={{marginTop:'50px' ,marginBottom:'50px',fontSize:"48px"}} />
</Grid>
)
}
const renderRatingCard=()=>
{
return(
    <Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">

<div> rating card </div>
    </Grid>
)
}
return (
<div>
  <Grid container spacing={3}>

    <Grid item xs={6}>
      <Paper> {renderAverageRatingCard()}</Paper>
    </Grid>
    <Grid item xs={6}>
      <Paper>{renderRatingCard()}</Paper>
    </Grid>
  </Grid>

  <PrimaryButton onClick={createReview}> Write An Review</PrimaryButton>
  {isOpen &&
       <AddReviewModel handleClose={close} open={open} />}
  <ReviewList classifiedid={classified._id}/>
</div>
)
}