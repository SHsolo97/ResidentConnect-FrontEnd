import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  card: {
    marginLeft:200,
    marginTop:30,
    width: 700
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ContactCard({children,...props}) {
  const classes = useStyles();
 const contactdetails=props.contactdetails;
 console.log(contactdetails);
  return (
    <Card className={classes.card}>
      <CardContent>
      <Grid
  container
  direction="row"
  justifyContent="flex-end"
  alignItems="baseline"
>     <EditIcon/>
      <DeleteIcon />
      </Grid>
  
        <Typography variant="h5" component="h2">
          {contactdetails.type}
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={7}>
        
        <Typography variant="body2" component="span">
         {contactdetails.name}         
        </Typography>
        <br/>
        <Typography variant="body2" component="span">
            {contactdetails.address.addressline} , {contactdetails.address.area}
        </Typography>
        <br/>
        <Typography variant="body2" component="span">
        {contactdetails.address.city} , {contactdetails.address.state} , {contactdetails.address.pincode}
            <br/>
            
            </Typography>
                {contactdetails.emails.map((email) => (
                     <span> <br/>
                     <Typography variant="body2" component="span">
                    {email}
                   </Typography>
                   </span>
                ))}
           </Grid>
           <Grid item xs={5}>
         
                {contactdetails.phone.map((phone) => (
                    <span> <br/>
                    <Typography variant="body2" component="span">
                    {phone.number} - {phone.hours}
                   </Typography>
                   </span>
                ))}
           </Grid>
           </Grid>
      </CardContent>
     
    </Card>
  );
}
