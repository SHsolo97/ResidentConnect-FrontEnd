import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import TimeAgo from 'timeago-react';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function SellItemCard({children,...props}) {
  const classes = useStyles();
  const history=useHistory();

 console.log(props.item);

 const openAd=(event)=>{
  console.log('open ad');
  console.log(props.helperTextitem);
  event.stopPropagation();
  event.preventDefault();
  history.push({
    pathname: '/adDetails',
    state: { advert: props.item }    

  })
}

  return (
    <Card className={classes.root} onClick={openAd}>
     <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        
      
      </CardActions>
      <CardActionArea>
      <CardMedia
        className={classes.media}
        image={props.item.images[0]}
        title='image'
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary" component="p">
        Rs {props.item.price.value}
        </Typography>
        <Typography variant="body" color="textSecondary" component="p">
        {props.item.title}

        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Tambaram, Chennai 

        </Typography>
      
       
        <Typography variant="body2" color="textSecondary" component="p">
        <TimeAgo  datetime={new Date(props.item.activatedat)}/>
        </Typography>
      </CardContent>
      </CardActionArea>
      
    </Card>
  );
}