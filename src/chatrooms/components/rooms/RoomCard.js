import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Grid } from '@material-ui/core';
import TimeAgo from 'timeago-react';

import ProfileAvatar from '../ProfileAvatar';

const useStyles = makeStyles((theme)=>({
root: {
maxWidth: 500,
},
avatar: {
width: theme.spacing(7),
height: theme.spacing(7),
}
}));

export const RoomCard = ({setCurrentRoomId,room}) => {
const classes = useStyles();
const { createdAt, name, lastMessage } = room;


const setCurrentRoom=()=>{
    console.log(room.id);
    setCurrentRoomId(room.id);
}
return (
<Card className={classes.root} onClick={setCurrentRoom} >
  <CardActionArea>
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <CardContent>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">

        <Grid item  justifyContent="flex-end" alignItems="center"  >
           <Typography variant="h6" component="h6">
            {name}
          </Typography>
          </Grid> 

          <Grid item    style={{marginLeft:250}} direction="column"  justifyContent="flex-end" alignItems="center"  >
          <Typography color="textSecondary" variant="body2" component="span">
          <TimeAgo 
                    datetime={lastMessage? new Date(lastMessage.createdAt):new Date(createdAt)}/>
          </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {lastMessage ?
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">

       <Grid item xs={2}>
            <ProfileAvatar style={{width:'50px' , height:'50px'}}  alt="u" src={lastMessage.author.avatar} className={classes.avatar} />
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