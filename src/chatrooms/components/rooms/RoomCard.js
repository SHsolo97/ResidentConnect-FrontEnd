import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import TimeAgo from 'timeago-react';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles((theme)=>({
root: {
maxWidth: 400,
},
avatar: {
width: theme.spacing(7),
height: theme.spacing(7),
}
}));

export const RoomCard = ({setCurrentRoomId,room}) => {
const classes = useStyles();
const { createdAt, name, lastMessage } = room;
const location=useLocation();
const history=useHistory();
const setCurrentRoom=()=>{
    console.log(room.id);
    setCurrentRoomId(room.id);
}
return (
<Card className={classes.root} onClick={setCurrentRoom} >
  <CardActionArea>
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <CardContent>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">

        <Grid item xs={8}> <Typography variant="h4" component="h1">
            {name}
          </Typography>
          </Grid> 
          <Grid item xs={4}  direction="row" justifyContent="flex-end" alignItems="flex-end">
          <Typography color="textSecondary" variant="body2" component="span">
          <TimeAgo 
                    datetime={lastMessage? new Date(lastMessage.createdAt):new Date(createdAt)}/>
          </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {lastMessage ?
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">

       <Grid item xs={3}>
            <Avatar alt="u" src={lastMessage.author.avatar} className={classes.avatar} />
        </Grid>
            <Grid items xs={9} container direction="column" justifyContent="flex-start" alignItems="flex-start">
            
             <Typography variant="body2" color="textSecondary" component="p">
             {lastMessage.author.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="span">
          {lastMessage.text || lastMessage.file.name}
          </Typography>
        </Grid>
        </Grid>
        : <Typography variant="body2" color="textSecondary" component="span">
          No Messages yet... 
          </Typography>
        }
      


    </Grid>
  </CardActionArea>

</Card>
);
}