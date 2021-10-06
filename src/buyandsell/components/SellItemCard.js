import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import TimeAgo from 'timeago-react';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import {useCommunity} from '../../context/community.context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    height: 400,
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
  const {community}=useCommunity();
  const address=`${community.address.area} ,  ${community.address.city}`;
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
    <Card key={props.key} className={classes.root} onClick={openAd}>
    
      <CardActionArea>
      <CardMedia
        className={classes.media}
        image={props.item.images[0]}
        title='image'
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary" component="p"> &#8377; {props.item.price.value.toLocaleString('en-IN')}</Typography>
        <br/>
        <Typography  style={{color:'blue',fontSize:'16px'}} component="span">{props.item.title.length>40?props.item.title.slice(0,37).concat('...') :props.item.title }</Typography>
        <br/>
        <br/>
        <Typography style={{fontSize:'14px'}}  component="span">{address}</Typography>
        <br/>
        <br/>
        <Typography variant="body2" color="textSecondary" component="p">
          <TimeAgo  datetime={new Date(props.item.activatedat)}/>
        </Typography>
      </CardContent>
      </CardActionArea>
      
    </Card>
  );
}