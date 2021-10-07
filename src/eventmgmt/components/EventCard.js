import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import events from "../allevents.js"

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
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

export default function EventCard({children,...props}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [avatarLabel,setAvatarLabel]=React.useState('A');
  const [event,setEvent]=React.useState(props.event);

  return (
    <Card className={classes.root} >
      <div className="eventCard"  >
      <CardHeader
    
        title={props.eventDetails.name}
      />
      <CardActionArea>
      <CardMedia
        className={classes.media}
        image={props.eventDetails.thumbnailimage}
      />
      <CardContent>
      <Typography variant="body1" color="textSecondary" component="p">
          Type: {props.eventDetails.mode}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          Venue: {props.eventDetails.city}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.eventDetails.description}
        </Typography>
      </CardContent>
      </CardActionArea>
      <CardActions >
      <p>{props.eventDetails.startdate} {props.eventDetails.starttime} - {props.eventDetails.enddate} {props.eventDetails.endtime} </p>
        
      </CardActions>
      </div>
    </Card>
  );
}