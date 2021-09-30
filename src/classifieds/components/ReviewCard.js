import React from 'react'
import Reviewer from './Reviewer';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useProfile } from '../../context/profile.context';
import { useModelState } from '../../misc/custom-hooks';
import  EditReviewModel  from './EditReviewModel';
import DeleteIcon from '@mui/icons-material/Delete';
import { convertDate } from '../../misc/helpers';



export const ReviewCard = ({ classified,comment,deleteReviewComment }) => {
  const { isOpen, open, close } = useModelState();
 

  const {user}=useProfile();
  const commentdate = convertDate(comment.createdat);
  const editComment = () => {
    console.log('clicked edit');
    open();
  }
  
  const deleteComment=()=>{
    deleteReviewComment(comment._id,comment.rating);
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
           <EditReviewModel classified={classified} givenComment={comment} handleClose={close} open={open} />}
          
    </div>
  )
}