import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
root: {
flexGrow: 1,
},
paper: {
padding: theme.spacing(2),
margin: 'auto',
maxWidth: 1000,
},
image: {
width: 200,
height: 200,
},
img: {
margin: 'auto',
display: 'block',
maxWidth: '100%',
maxHeight: '100%',
},
}));

export default function ClassifiedOverview({...props}) {
const classes = useStyles();
const classified=props.classified;

return (
<div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="complex" src={classified.thumbnail} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h4" style={{color:'blue'}}>
            {classified.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classified.address.addressline} , {classified.address.area} , {classified.address.city}, {classified.address.state} , {classified.address.pincode} </Typography>
            <Typography variant="body1">
              <PhoneIcon fontSize="small" /> {classified.phone[0].number}
            </Typography>
            <Typography variant="body1">
              {classified.emails}
            </Typography>
          </Grid>
       
        </Grid>

      </Grid>
    </Grid>
</div>
);
}