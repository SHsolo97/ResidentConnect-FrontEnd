import React,{useState,useEffect} from 'react'
import PrimaryButton from '../../shared/components/PrimaryButton'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import ReviewList from './ReviewList';
import {useModelState} from '../../misc/custom-hooks';
import AddReview from './AddReview';
import ProgressBar from '../../shared/components/ProgressBar';
import { useCurrentClassified } from '../../context/currentclassified.context';
import  {ClassifiedRatings}  from './ClassifiedRatings';
import {fetchClassifiedById,fetchCommentsAndUsers} from '../actions';

import { connect } from 'react-redux';


 export const ClassifiedReviews = ({...props}) => {
  const classifiedid=useCurrentClassified(v=>v._id);

  useEffect(() => {
    console.log(classifiedid);
     props.fetchClassifiedById(classifiedid);
     props.fetchCommentsAndUsers(classifiedid);

}, [])


return (
<div>
  <ClassifiedRatings classified={props.classified}   /> 
  <AddReview classified={props.classified}     />
  <ReviewList  classified={props.classified} comments={props.comments}  />
</div>
)
  }

  const mapStateToProps = state => {
    console.log(state.classified) ;
       return { classified: state.classified,
        comments: state.comments };
  };
  
  export default connect(
    mapStateToProps,
    { fetchClassifiedById,fetchCommentsAndUsers }

  )(ClassifiedReviews);
  