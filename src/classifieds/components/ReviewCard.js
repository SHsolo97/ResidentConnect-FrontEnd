import React from 'react'
import Reviewer from './Reviewer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

export const ReviewCard = ({comment}) => {
return (
<Grid container spacing={3}>
  <Grid item xs={2}>
    <Reviewer userId={comment.givenby} createdat={comment.createdat} />
  </Grid>
  <Grid item xs={10}>
    <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
    <Grid container direction="column" justifyContent="space-around" alignItems="flex-end">

        <Rating name="rating" value={comment.rating} readOnly />
        </Grid>
        <Typography variant="body2">{comment.comment} </Typography>
    </Grid>
  </Grid>
</Grid>

)
}
