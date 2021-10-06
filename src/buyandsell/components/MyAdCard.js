
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import CardActionArea from '@material-ui/core/CardActionArea';
import {convertDate} from '../../misc/helpers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
      marginLeft:100,
    width: 1300,
    marginTop:50
  },
  advertdate:{
    backgroundColor: '#0063cc',

      fontSize: 14,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    
  },
  media: {
    height: 140,
    width:140
  },
  pos: {
    marginBottom: 12,
  },
});

export default function MyAdCard({...props}) {
  const history=useHistory();
  const classes = useStyles();
  const advert=props.advert;
const openAd=(event)=>{
    console.log('open ad');
    console.log(advert);
    event.stopPropagation();
    event.preventDefault();
    history.push({
      pathname: '/adDetails',
      state: { advert: advert }    

    })
}
// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}


  return (
    <Card className={classes.root} onClick={openAd}>
   <CardActionArea>
       <Grid alignItems="center" container  zeroMinWidth >
  <Grid item xs={2}    container
  direction="row" justifyContent="flex-start"
  alignItems="flex-start"  style={{paddingLeft:'20px'}} >
        <div>
        <Typography color="textSecondary" gutterBottom>
          FROM: {convertDate(advert.activatedat)}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          TO: {convertDate(advert.expiredat)}
        </Typography>
        </div>
      </Grid>
      
    <Grid item xs={7} zeroMinWidth>
<Grid
  container
  direction="row"
  justifyContent="space-around"
  alignItems="center"   zeroMinWidth
>

    <CardMedia
         className={classes.media} component="img"

          image= {advert.images[0]}
          title="image"
        />
        <Typography color="textSecondary" > {advert.title.slice(0,20)} </Typography>
        <Typography color="textSecondary" >  &#8377; {advert.price.value.toLocaleString('en-IN')} </Typography> 
        <Chip label={advert.status.capitalize()} style={{backgroundColor:advert.status==='active'?'green':'red'}}  />
       
    </Grid>
   
    </Grid>
    <Grid item xs={3} zeroMinWidth>
    <Typography  color="textSecondary" > {advert.description.slice(0,97)} ...</Typography>
    </Grid>
    </Grid>
    </CardActionArea>
    </Card>
  );
}