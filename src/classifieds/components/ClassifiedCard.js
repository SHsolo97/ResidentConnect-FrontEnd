import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PhoneIcon from '@material-ui/icons/Phone';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useHistory } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
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

export default function ClassifiedCard({...props}) {
const history=useHistory()
const classes = useStyles();
const classified=props.classified;
const showClassified =()=>{
  history.push({
    pathname: '/viewClassified',
      state: { classified: classified } });
}
return (
<div className={classes.root}>
  <Paper className={classes.paper}>
    <Grid container spacing={2}>
      <Grid item>
        <ButtonBase className={classes.image}>
          <img className={classes.img} alt="complex" src={classified.thumbnail} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h5">
            {classified.name}
            </Typography>
           
            <Typography variant="body1" gutterBottom>
              {classified.address.addressline} , {classified.address.area} , {classified.address.city}, {classified.address.state} , {classified.address.pincode} </Typography>
          
               <Typography variant="body1">
              <PhoneIcon style={{height:"14px", width:"14px"}} /> {classified.phone[0].number}
            </Typography>
         
            <Typography variant="body1">
            <EmailIcon style={{height:"14px", width:"14px"}} />  {classified.emails}
            </Typography>
          </Grid>
          <Grid container justifyContent="flex-end" alignItems="center">
            <PrimaryButton onClick={showClassified}>Details</PrimaryButton>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  </Paper>
</div>
);
}