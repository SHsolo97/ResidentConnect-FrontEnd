import React from 'react';

import ChatBottom from '../../components/chatwindow/bottom';
import Messages from '../../components/chatwindow/messages';
import ChatTop from '../../components/chatwindow/top';
import { CurrentRoomProvider } from '../../../context/currentroom.context';
import { useRooms } from '../../../context/rooms.context';
import { auth } from '../../../misc/firebase';
import { transformToArr } from '../../../misc/helpers';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@mui/material/Paper';

const Chat = ({children}) => {
//const { chatId } = useParams();
const chatId=children;
const rooms = useRooms();
if (!rooms) {
return (<CircularProgress />)}
const currentRoom = rooms.find(room => room.id === chatId);
if (!currentRoom) {
return <h6 className="text-center mt-page"> Chat {chatId} not found </h6>
}

const { name, description } = currentRoom;
const id = currentRoom.id;

const admins = transformToArr(currentRoom.admins);
const isAdmin = admins.includes(auth.currentUser.uid);
const members=transformToArr(currentRoom.members);
const isMember=members.includes(auth.currentUser.uid);
const currentRoomData = {
id,
name,
description,
isAdmin,
admins,
isMember,
members
}

return (
<CurrentRoomProvider data={currentRoomData}>
  <Paper  elevation={3}>
  <div style={{padding:'16px'}}>
  <Grid container direction="column" justifyContent="space-between" alignItems="stretch">

  <ChatTop />
  <Divider style={{ background:'orange'}}/>
  <Messages />
  <Divider/>

  <Grid container direction="column" >

    <ChatBottom />
    </Grid>
  </Grid>
  </div>
  </Paper>
</CurrentRoomProvider>
);
}

export default Chat;