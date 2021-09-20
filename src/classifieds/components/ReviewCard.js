import React from 'react'
import Reviewer from './Reviewer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useProfile } from '../../context/profile.context';
import { useModelState } from '../../misc/custom-hooks';
import { EditReviewModel } from './EditReviewModel';
import { useCurrentClassified } from '../../context/currentclassified.context';
import DeleteIcon from '@mui/icons-material/Delete';
import { calculateAverageStars } from "../../misc/helpers";
import classifiedAPI from "../../misc/axios-calls/classifiedAPI";


export const ReviewCard = ({ comment }) => {
  const date = new Date(comment.createdat);
  const { isOpen, open, close } = useModelState();
  const classifiedid=useCurrentClassified(v=>v._id);
  const ratings=useCurrentClassified(v=>v.ratings);

  const {user}=useProfile();
  const commentdate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  const editComment = () => {
    console.log('clicked edit');
    open();
  }
  const editRatingDetails = async (rating) => {
    const reviewData = {};

    let _5star = parseInt(ratings._5star);
    let _4star = parseInt(ratings._4star);
    let _3star = parseInt(ratings._3star);
    let _2star = parseInt(ratings._2star);
    let _1star = parseInt(ratings._1star);
    let _totrating = parseInt(ratings._totrating);
    let _avgstar = parseFloat(ratings._avgstar);

    // eslint-disable-next-line default-case
    switch (rating) {
      case 1:
        _1star = _1star - 1;
        break;
      case 2:
        _2star = _2star - 1;
        break;
      case 3:
        _3star = _3star - 1;
        break;
      case 4:
        _4star = _4star - 1;
        break;
      case 5:
        _5star = _5star - 1;
        break;
    }
    _totrating=_totrating-1
    
    _avgstar = calculateAverageStars(
      _1star,
      _2star,
      _3star,
      _4star,
      _5star,
      _totrating
    );
    console.log(_avgstar);
    reviewData["_1star"] = _1star;
    reviewData["_2star"] = _2star;
    reviewData["_3star"] = _3star;
    reviewData["_4star"] = _4star;
    reviewData["_5star"] = _5star;
    reviewData["_avgstar"] = _avgstar;
    reviewData["_totrating"] = _totrating;
    const data = {
      ratings: reviewData,
    };
    var apiBaseUrl = `/classifieds/${classifiedid}`;

    await classifiedAPI
      .put(apiBaseUrl, data)
      .then(function (response) {
        if (response.status === 200) {
          console.log("edited the rating details")
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  const deleteReviewComment = async (rating) => {
    var apiBaseUrl = `/classifieds/comments/${comment._id}`;

    await classifiedAPI
      .delete(apiBaseUrl)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          editRatingDetails(rating)
          
        }
      })
      .catch(function (error) {
        console.log(error);
     
      });
  };
  const deleteComment=()=>{
    deleteReviewComment(comment.rating);
  }
  return (
    <div><Grid container spacing={3}>
      <Grid item xs={1}>
        <Reviewer userId={comment.givenby} createdat={commentdate} />
      </Grid>
      <Grid item xs={11}>
        <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
          {user._id===comment.givenby &&
                   <Grid container direction="row"  justifyContent="flex-end" alignItems="flex-end">
   <IconButton aria-label="edit" onClick={editComment}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={deleteComment}>
        <DeleteIcon />
      </IconButton>
     
          </Grid>
          }
          <Grid container direction="column" justifyContent="space-around" alignItems="flex-end">

            <Rating name="rating" value={comment.rating} readOnly />
          </Grid>
          <Typography variant="body2">{comment.comment} </Typography>
        </Grid>
      </Grid>

    </Grid>
          {isOpen &&
           <EditReviewModel  givenComment={comment} handleClose={close} open={open} />}
          
    </div>
  )
}