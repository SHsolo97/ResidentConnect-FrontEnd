import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import {PrimaryButton} from '../../../shared/components/PrimaryButton';
import { useProfile } from '../../../context/profile.context';
import { database,auth } from '../../../misc/firebase';
import firebase from 'firebase/app';
import { transformArrWithId,transformArrWithoutId, transformToArr } from '../../../misc/helpers';
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

export const JoinRoomCard = ({room,requests}) => {
  const {user}=useProfile();
  const {community}=useCommunity();
  const communityid=community._id;
  //const reqListRooms=transformArrWithId(requests.length==0?[]:requests[0]);
 // console.log(reqListRooms);
  const classes = useStyles();
  const {  name, id } = room;
 
  const[reqList,setReqList]=React.useState([]);
  
 
// React.useEffect(() => {
//       console.log(requests);
//       const data=transformArrWithoutId(requests)
//       //const data=requests.slice(0, -1);
//       console.log(data);
//       setReqList(data);
    
// },[]);
  React.useEffect(() => {
      let found=false;
      // eslint-disable-next-line array-callback-return
      const reqListRooms = database.ref(`requests/${communityid}`); //request list of the rooms
      reqListRooms.on('value', (snap1) => {
        const data = transformArrWithId(snap1.val());
        //console.log(data);
        data.map((reqOfroom)=>{
        if(reqOfroom.id===room.id)
        {
          const reqListRef = database.ref(`requests/${communityid}/${room.id}`); //request list of the rooms
          reqListRef.on('value', (snap2) => {
              const data1 = transformArrWithId(snap2.val());
            
              setReqList(data1);
          });
          
          found=true;
        }
      })
    })
    if(!found) 
      setReqList([]);
    return()=>{
      setReqList([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

 const getRequestStatus=()=>
 {
   console.log(reqList);
    // eslint-disable-next-line array-callback-return
    let status= 'Not Raised';
    const data =reqList.filter(req=>req.raisedby.uid===auth.currentUser.uid);
   if(data.length!==0)
   {
     status=data[0].status;
   }
   return status;
 }
const getButton=()=>{
  const status=getRequestStatus();
  console.log(status);
  if(status==='Not Raised')
  return <PrimaryButton  onClick={requestToJoin}>Join</PrimaryButton>
  else if(status==='pending')
  return <PrimaryButton disabled='true' >Pending</PrimaryButton>
  else if(status==='Declined')
  return <PrimaryButton disabled='true'>Declined</PrimaryButton>

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