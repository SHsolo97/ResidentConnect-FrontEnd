import React from 'react'
import { connect } from 'react-redux';
import { Avatar, Typography,Paper } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { formatPhone,convertDate } from '../../misc/helpers';
import {Divider} from '@material-ui/core';
export const Requester = ({...props}) => {
    console.log(props.ridereq);
    return (
        <Paper elevation={3} style={{marginBottom:'20px', padding:'20px'}}>
              {props.requester!=null &&  <Grid
  container
  direction="column"
  justifyContent="space-around"
  alignItems="flex-start" spacing={1}
>
        <Avatar  style={{ height: '50px', width: '50px' , objectFit:'cover' }} src={props.requester.avatar} />
        <Typography style={{marginTop:'10px'}} variant="body1" gutterBottom component="div"><span style={{fontWeight:'bold'}}> Name: {'  '} </span> {props.requester.firstname} {props.requester.lastname}  </Typography>
        <Typography   style={{marginTop:'10px'}}  variant="body1" gutterBottom component="div"><span style={{fontWeight:'bold'}}> Phone: {'  '} </span> {formatPhone(props.requester.phone[0].number)}</Typography>
        <Typography   style={{marginTop:'10px'}}  variant="body1" gutterBottom component="div"> <span style={{fontWeight:'bold'}}> Seats Requested: {'  '} </span> {props.ridereq.seats}</Typography>
        <Typography  style={{marginTop:'10px'}}  variant="body1" gutterBottom component="div"> <span style={{fontWeight:'bold'}}> Status: {'  '} </span> {props.ridereq.status}</Typography>

            </Grid>}</Paper>

    )
}
const mapStateToProps = (state,ownProps) => {
    console.log(ownProps.ridereq.requestedby);
    return {
     requester: state.users.find(user => user._id === ownProps.ridereq.requestedby) 

    };
};
export default connect(
    mapStateToProps
   
  
  )(Requester);