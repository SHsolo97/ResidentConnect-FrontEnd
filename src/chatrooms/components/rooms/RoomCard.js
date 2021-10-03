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
width: 450,
},
avatar: {
width: theme.spacing(7),
height: theme.spacing(7),
}
}));

export const RoomCard = ({setCurrentRoomId,room}) => {
const classes = useStyles();
const { createdAt, name, lastMessage } = room;

  // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const setCurrentRoom=()=>{
    console.log(room.id);
    setCurrentRoomId(room.id);
}
return (
<Card elevation={10} className={classes.root} onClick={setCurrentRoom} >
  <CardActionArea style={{padding:'10px'}}>
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
      <CardContent>
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item  justifyContent="flex-end" alignItems="center"  >
           <Typography variant="h5" component="h5">
            {name}
          </Typography>
          </Grid> 

          <Grid item   direction="column"  justifyContent="flex-end" alignItems="center"  >
          <Typography  style={{marginLeft:310,fontSize:'12px'}} variant="body2" component="span">
          <TimeAgo 
                    datetime={lastMessage? new Date(lastMessage.createdAt):new Date(createdAt)}/>
          </Typography>
          </Grid>
        </Grid>
    
      {lastMessage ?
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">

       <Grid item xs={2}>
            <ProfileAvatar style={{width:'50px' , height:'50px'}}  alt={lastMessage.author.name} src={lastMessage.author.avatar} className={classes.avatar} />
        </Grid>
            <Grid items xs={10} container direction="column" justifyContent="flex-start" alignItems="flex-start">
            
             <Typography style={{fontWeight:'bold',fontSize:'16px'}} variant="body2"  component="div">
             {lastMessage.author.name.capitalize()}
          </Typography>
          <Typography variant="body2"  style={{fontSize:'12px'}} component="span">
          {lastMessage.text || lastMessage.file.name}
          </Typography>
        </Grid>
        </Grid>
        : <Typography variant="body2" component="span">
          No Messages yet... 
          </Typography>
        }
      
      </CardContent>

    </Grid>
  </CardActionArea>

</Card>
);
}