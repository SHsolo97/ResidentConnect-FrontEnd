/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import ReviewList from './ReviewList';
import AddReview from './AddReview'
import { useCurrentClassified } from '../../context/currentclassified.context';
import  {ClassifiedRatings}  from './ClassifiedRatings';
import {fetchClassifiedById,fetchCommentsAndUsers} from '../actions';
import { connect } from 'react-redux';
import {Progress} from '../../shared/components/Progress'

 export const ClassifiedReviews = ({...props}) => {
  const classifiedid=useCurrentClassified(v=>v._id);

  useEffect(() => {
    console.log(classifiedid);
     props.fetchClassifiedById(classifiedid);
     props.fetchCommentsAndUsers(classifiedid);

}, [classifiedid])


return (
<div>
  {
    props.classified===null?
    <Progress/>
    :
    <div>
      <ClassifiedRatings comments={props.comments}  classified={props.classified}   /> 
  <AddReview classified={props.classified}     />
  <ReviewList  classified={props.classified} comments={props.comments}  />
  </div>
  }
  
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
  