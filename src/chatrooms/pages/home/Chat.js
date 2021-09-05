import React from 'react';
import { useParams } from 'react-router'
import { Loader } from 'rsuite';
import ChatBottom from '../../components/chatwindow/bottom';
import Messages from '../../components/chatwindow/messages';
import ChatTop from '../../components/chatwindow/top';
import { CurrentRoomProvider } from '../../../context/currentroom.context';
import { useRooms } from '../../../context/rooms.context';
import { auth } from '../../../misc/firebase';
import { transformToArr } from '../../../misc/helpers';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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
const currentRoomData = {
id,
name,
description,
isAdmin,
admins
}

return (
<CurrentRoomProvider data={currentRoomData}>
  <Grid container direction="column" justifyContent="space-around" alignItems="center">
  <ChatTop />
    <ChatBottom />
  </Grid>
</CurrentRoomProvider>
);
}

export default Chat;