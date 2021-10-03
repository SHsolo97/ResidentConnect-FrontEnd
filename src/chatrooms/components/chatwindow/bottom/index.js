import React, { useState,useCallback } from 'react';
import { Alert } from 'rsuite';
import firebase from 'firebase/app';
import { useProfile } from '../../../../context/profile.context';
import { useCommunity } from '../../../../context/community.context';

import { database } from '../../../../misc/firebase';
import AttachmentBtnModal from './AttachmentBtnModal';
import { TextField } from '@material-ui/core';
import { IconButton} from '@material-ui/core';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import SendIcon from '@material-ui/icons/Send';
import { Grid } from '@material-ui/core';

function assembleMessage(user, chatId) {
return {
roomId: chatId,
author: {
name: user.firstname + ' ' + user.lastname,
uid: user.uid,
...(user.avatar ? { avatar: user.avatar } : {})

},
createdAt: firebase.database.ServerValue.TIMESTAMP,
likeCount:0
};

}

const ChatBottom = () => {
const [input, setInput] = useState('');
const [ isLoading,setIsLoading] = useState(false);
const { user } = useProfile();
const {community}=useCommunity();
const communityid=community._id;


const chatId = useCurrentRoom(v => v.id);

const onInputChange = (event) => {
setInput(event.target.value);
console.log(input);
};
const onSendClick = async () => {
if (input.trim() === '') {
return;
}
const msgData = assembleMessage(user, chatId);
msgData.text = input;
const updates = {};
const messageId = database.ref('messages').push().key;
updates[`/messages/${messageId}`] = msgData;
updates[`/rooms/${communityid}/${chatId}/lastMessage`] = {
...msgData,
msgId: messageId
};
setIsLoading(true);
try {
await database.ref().update(updates);
setInput('');
setIsLoading(false);

}
catch (err) {
setIsLoading(false);
Alert.error(err.message, 5000);
}


}
const onKeyDown = (event) => {
if (event.keyCode === 13) {
event.preventDefault();
onSendClick();
}
}
const afterUpload = useCallback(async (files) => {
setIsLoading(true);
const updates = {};
files.forEach(file => {
const msgData = assembleMessage(user, chatId);
msgData.file = file
const messageId = database.ref('messages').push().key;
updates[`/messages/${messageId}`] = msgData;

})
const lastMsgId = Object.keys(updates).pop();
updates[`/rooms/${communityid}/${chatId}/lastMessage`] = {
...updates[lastMsgId],
msgId: lastMsgId
}
try {
await database.ref().update(updates);
setIsLoading(false);
}
catch (err) {
setIsLoading(false);
Alert.error(err.message, 5000);
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [chatId, user])

return (
  
<Grid container justifyContent="center" alignItems="flex-end">
  
  <AttachmentBtnModal afterUpload={afterUpload} />
  <TextField   multiline style={{width:600}} placeholder="write a new message here..." value={input} onChange={onInputChange} onKeyDown={onKeyDown} />
  <IconButton aria-label="send" onClick={onSendClick}>
    <SendIcon />
  </IconButton>
</Grid>

);
}

export default ChatBottom;