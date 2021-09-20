import React,{useState,useEffect} from 'react'
import PrimaryButton from '../../shared/components/PrimaryButton'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import ReviewList from './ReviewList';
import {useModelState} from '../../misc/custom-hooks';
import {AddReview} from './AddReview';
import ProgressBar from '../../shared/components/ProgressBar';
import { useCurrentClassified } from '../../context/currentclassified.context';


 export const ClassifiedReviews = () => {
  const ratings=useCurrentClassified(v=>v.ratings);
  const classifiedid=useCurrentClassified(v=>v._id);

  const [isRender,setIsRender]=React.useState(false);
const renderAverageRatingCard=()=>
{
return(

<Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">
  <div style={{marginTop:'50px', fontSize:"48px",color:'blue'}}> {ratings._avgstar}/5</div>
  <Rating name="avgrating" precision={0.5} value={ratings._avgstar} readOnly style={{marginTop:'50px' ,marginBottom:'50px',fontSize:"48px"}} />
</Grid>
)
}
const renderRatingCard=()=>
{
  const _5star_percent=Math.round(((ratings._5star/ratings._totrating)*100),1);
  const _4star_percent=Math.round(((ratings._4star/ratings._totrating)*100),1);
  const _3star_percent=Math.round(((ratings._3star/ratings._totrating)*100),1);
  const _2star_percent=Math.round(((ratings._2star/ratings._totrating)*100),1);
  const _1star_percent=Math.round(((ratings._1star/ratings._totrating)*100),1);

return(
    <Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">
    <Grid  container direction="row" style={{  marginTop:'50px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>5 stars</span>
   <ProgressBar bgcolor="orange" progress={_5star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({ratings._5star})</span>
    </Grid>
    <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>4 stars</span>
   <ProgressBar bgcolor="orange" progress={_4star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({ratings._4star})</span>
    </Grid>
    <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>3 stars</span>
   <ProgressBar bgcolor="orange" progress={_3star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({ratings._3star})</span>
    </Grid>

    <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>2 stars</span>
   <ProgressBar bgcolor="orange" progress={_2star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({ratings._2star})</span>
    </Grid>

    <Grid  container direction="row" style={{  marginTop:'5px', marginBottom:'50px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>1 stars</span>
   <ProgressBar bgcolor="orange" progress={_1star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({ratings._1star})</span>
    </Grid>
     </Grid>
)
}

const newReview=(data)=>
{
  setIsRender(true);
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


  <AddReview newReview={newReview} />
  <ReviewList newReview ={isRender} />
</div>
)
  }