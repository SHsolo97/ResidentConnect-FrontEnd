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
import { useHistory, useLocation } from 'react-router-dom';
import ProfileAvatar from '../ProfileAvatar';
import PrimaryButton from '../../../shared/components/PrimaryButton';
import { useProfile } from '../../../context/profile.context';
import { database,auth } from '../../../misc/firebase';
import firebase from 'firebase/app';
import { transformArrWithId } from '../../../misc/helpers';
import { useRoomsRequests } from '../../../context/roomsrequest.context';
import { useCommunity } from '../../../context/community.context';

const useStyles = makeStyles((theme)=>({
root: {
maxWidth: 500,
},
avatar: {
width: theme.spacing(7),
height: theme.spacing(7),
}
}));

export const JoinRoomCard = ({room}) => {
  const {user}=useProfile();
  const {community}=useCommunity();
  const communityid=community._id;
  const reqListRooms=useRoomsRequests();
  const classes = useStyles();
  const { createdAt, name, lastMessage,id } = room;
  const location=useLocation();
  const history=useHistory();
  const[reqList,setReqList]=React.useState([]);
  React.useEffect(() => {
      let found=false;
      reqListRooms.map(reqOfroom=>{
        if(reqOfroom.id===room.id)
        {
          const reqListRef = database.ref(`requests/${communityid}/${room.id}`); //request list of the rooms
          reqListRef.on('value', (snap) => {
              const data = transformArrWithId(snap.val());
            
              setReqList(data);
          });
          
          found=true;
        }
    })
    if(!found) 
      setReqList([]);
    return()=>{
      setReqList([]);
    }
  }, [])

 const getRequestStatus=()=>
 {
   console.log(reqList);
  reqList.map(req=>
    {
      console.log(req.raisedby.uid);
      console.log(auth.currentUser.uid);
      if(req.raisedby.uid===auth.currentUser.uid)
      {
        return req.status;
      }
    })
   return 'Not Raised';
 }
const getButton=()=>{
  const status=getRequestStatus();
  console.log(status);
  if(status==='Not Raised')
  return <PrimaryButton  onClick={requestToJoin}>Join</PrimaryButton>
  else if(status==='Pending')
  return <PrimaryButton >Pending</PrimaryButton>
  else if(status==='Declined')
  return <PrimaryButton>Declined</PrimaryButton>

}
const requestToJoin=async ()=>{
  console.log( `request to join room ${id}`);
  const newRequestdata = {
    
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    raisedby:{
      name: user.firstname + ' ' + user.lastname,
      uid: user.uid,
      ...(user.avatar ? { avatar: user.avatar } : {})
      },
      type:'member',
    status:'pending'
  }
  console.log(newRequestdata);
  try {
     await database.ref(`/requests/${communityid}/${id}`).push(newRequestdata);
  }
catch(err)
{
  console.log(err);
}
     
}
 


return (
<Card className={classes.root}  >
      <CardContent>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
           <Typography variant="h6" component="h6">
            {name}
          </Typography>
          {
          getButton()
          }
             

        
    </Grid>
    </CardContent>

</Card>
);
}