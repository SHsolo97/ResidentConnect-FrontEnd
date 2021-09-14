/* eslint-disable consistent-return */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Alert, Button } from 'rsuite';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import { auth, database, storage } from '../../../../misc/firebase';
import { transformArrWithId, groupBy} from '../../../../misc/helpers';
import MessageItem from './MessageItem';
import { Paper } from '@material-ui/core';
import { useProfile } from '../../../../context/profile.context';
const PAGE_SIZE = 50;
const messageRef = database.ref('/messages');

function shouldScrollToBottom(node, threshold = 30) {
    const percentage = (100 * node.scrollTop) / (node.scrollHeight-node.clientHeight)||0;
    return percentage > threshold
}
const Messages = () => {
    const selfRef = useRef();
    const  chatId  = useCurrentRoom(v => v.id);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [messages, setMessages] = useState(null);
    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;
   const {user}=useProfile();
   const communityid=user.communities[0];

    const loadMessages = useCallback((limitToLast) => {
        messageRef.off();
        messageRef
            .orderByChild('roomId')
            .equalTo(chatId)
            .limitToLast(limitToLast || PAGE_SIZE)
            .on('value', (snap) => {
                const data = transformArrWithId(snap.val());
                setMessages(data);

                const node = selfRef.current;
                if (shouldScrollToBottom(node)) {
                    node.scrollTop = node.scrollHeight;
                }
           
            })
        setLimit(p => p + PAGE_SIZE);

    }, [chatId]);

    const onLoadMore = useCallback(() => {
        const node = selfRef.current;
        const oldHeight = node.scrollHeight;
        loadMessages(limit)
        setTimeout(() => {
            const newHeight = node.scrollHeight;
            node.scrollTop = newHeight - oldHeight;
        },200)
    }, [loadMessages,limit]);

    useEffect(() => {
        const node = selfRef.current;

        loadMessages();
        setTimeout(() => {
            node.scrollTop = node.scrollHeight;


            }, 200);
        return () => {
            messageRef.off('value');

        }
    }, [loadMessages])
    const handleAdmin = useCallback(async (uid) => {

        const adminRef = database.ref(`/rooms/${communityid}/${chatId}/admins`);
        let alertMsg;
        await adminRef.transaction(admins => {
            if (admins) {
                if (admins[uid]) {
                    admins[uid] = null;
                    alertMsg = `Admin Permission Removed`;
                }
                else {
                    admins[uid] = true;
                    alertMsg = `Admin Permission Granted`;
                }
               
            }
            return admins;
        })
       
        Alert.info(alertMsg, 5000);
    }, [chatId])

    const handleLike = useCallback(async (msgid) => {
        // console.log(msgid);
        const { uid } = auth.currentUser;
        const messagelikeRef = database.ref(`/messages/${msgid}`);
        let alertMsg;
        await messagelikeRef.transaction(msg => {
            if (msg) {
                if (msg.likes && msg.likes[uid]) {
                    msg.likes[uid] = null;
                    msg.likeCount -= 1;
                    alertMsg = `Like Removed`;
                }
                else {                    
                    msg.likeCount += 1;
                    if (!msg.likes)
                        msg.likes = {};
                    msg.likes[uid] = true;
                    alertMsg = `Like Added`;
                }

            }
            return msg;
        })
        Alert.info(alertMsg, 5000);
    }, [])
    const handleDelete = useCallback(async (msgId,file) => {
        if (!window.confirm('Delete this message?')) {
            return;
        }
        const isLast = messages[messages.length - 1].id === msgId;

        const updates = {};
        
        updates[`/messages/${msgId}`] = null;
        if (isLast && messages.length>2) {
            updates[`/rooms/${communityid}/${chatId}/lastMessage`] = {
                ...messages[messages.length - 2],
                msgId: messages[messages.length-2].id
            }
        }
        if (isLast && messages.length ===1) {
            updates[`/rooms/${communityid}/${chatId}/lastMessage`] = null;

        }
        try {
            await database.ref().update(updates);
            Alert.info('Message is deleted');
        }
        catch (err) {
            return Alert.error(err.message, 5000);
        }
        if (file) {
            try {
                const fileRef = await storage.refFromURL(file.url);
                await fileRef.delete();

            }
            catch (err) {
                Alert.error(err.message, 5000);
            }
        }
    }, [chatId, messages])
    const renderMessages = () => {
        const groups = groupBy(messages, (item) => new Date(item.createdAt).toDateString()
        );
    
    const items = [];
        Object.keys(groups).forEach((date) => {
            items.push(

                <li key={date} style={{marginBottom:'10px',color:'blue', fontSize:'16px',listStyleType:'none', textAlign:'center'}}> {date} </li>
            );
            const msgs = groups[date].map(msg => (
                <MessageItem
                    key={msg.id}
                    message={msg}
                    handleAdmin={handleAdmin}
                    handleLike={handleLike}
                    handleDelete={handleDelete} />

            ));
            items.push(...msgs);
        });
        return items;
    };
    return (
        <Paper style={{height: 500, overflow: 'auto'}}>

        <div ref={selfRef} >
            {messages && messages.length >= PAGE_SIZE && 
               
                <Button disabled={messages.length <PAGE_SIZE } onClick={onLoadMore} color="green" > Load More </Button>
               
            }
            {isChatEmpty && <h6> No messages yet </h6>}
            {canShowMessages &&
                renderMessages()
                }

        </div>
        </Paper>

    );
}

export default Messages;