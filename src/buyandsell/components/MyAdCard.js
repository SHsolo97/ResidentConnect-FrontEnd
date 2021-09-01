
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { deepOrange, grey, orange } from '@material-ui/core/colors';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  root: {
      marginLeft:100,
    width: 1300,
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
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const advert=props.advert;
const openAd=(event)=>{
    console.log('open ad');
}

  return (
    <Card className={classes.root} onClick={openAd}>
   <CardActionArea>
       <Grid alignItems="center" container  >
  <Grid item xs={2}    container
  direction="row" justifyContent="space-around"
  alignItems="center"  >
        <div>
        <Typography color="textSecondary" gutterBottom>
          FROM: {advert.activatedat}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          TO: {advert.expireat}
        </Typography>
        </div>
      </Grid>
      
    <Grid item xs={5}>
<Grid
  container
  direction="row"
  justifyContent="space-around"
  alignItems="center"  
>

    <CardMedia
         className={classes.media} component="img"

          image= {advert.thumbnail}
          title="image"
        />
        <Typography color="textSecondary" > {advert.title} </Typography>
        <Typography color="textSecondary" > {advert.price.value} </Typography> 
        <Chip label="active" color="primary" />
       
    </Grid>
   
    </Grid>
    <Grid item xs={5}>
    <Typography  color="textSecondary" > {advert.description}</Typography>
    </Grid>
    </Grid>
    </CardActionArea>
    </Card>
  );
}