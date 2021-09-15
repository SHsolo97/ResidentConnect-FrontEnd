import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import { SectionHeader } from '../../shared/components/SectionHeader'
import PrimaryButton from '../../shared/components/PrimaryButton'
import Grid from '@material-ui/core/Grid';
import {Field, reduxForm} from 'redux-form';
import formvalidate from './formvalidate';

class AddReviewModel extends React.Component{
renderRatingField ({

input

}) {
return <Rating {...input}  />
}
renderTextField (
{ input}
){
    return <TextField {...input} />
}

onSubmit (formValues){
console.log(formValues);

};
render(){
return (
<Dialog style={{ width: '100ch'}} open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">
    <SectionHeader> Write your review </SectionHeader>
  </DialogTitle>
  <DialogContent>

    <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
      <Grid container direction="column" justifyContent="space-around" alignItems="center">

        <div>
          <Field name="rating" component={this.renderRatingField} label="rating" id="rating" />
        </div>


        <div>
          <Field name="comment" component={this.renderTextField} label="Comment" multiline rows={10} palceholder="enter comment" variant="outlined" />
        </div>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <PrimaryButton type="submit">Submit</PrimaryButton>
          <PrimaryButton onClick={this.props.handleClose}> Cancel </PrimaryButton>

        </Grid>
      </Grid>
    </form>
  </DialogContent>
</Dialog>
);
}
}



export default reduxForm({
form: 'inputCommentForm'// a unique identifier for this form

})(AddReviewModel)