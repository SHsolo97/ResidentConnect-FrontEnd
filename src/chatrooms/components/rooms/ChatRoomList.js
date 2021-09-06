import React from 'react';
import { Loader, Nav } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';

import { useRooms } from '../../../context/rooms.context';
import { useProfile } from '../../../context/profile.context';
import {RoomCard} from './RoomCard';
import { Paper } from '@material-ui/core';

const ChatRoomList = ({ setCurrentRoomId, aboveElHeight }) => {
    const rooms = useRooms();
    console.log(rooms);
    const {user}=useProfile();
    //const c_rooms=rooms.find(room => room.communityid === communityid);
    const location = useLocation();
    const setCurrentRoom=(roomid)=>{
        console.log(roomid);
        setCurrentRoomId(roomid);
    } 
    return (
        <Paper style={{height: 600, overflow: 'auto'}}>
        <Nav
        appearance="subtle"
        vertical
        reversed
        style={{ height: `calc(100% -${aboveElHeight}px)` }}
        activeKey={location.pathname} 
    >
            {!rooms && (<Loader center vertical content="Loading" speed="slow" size="md" />)}
            {rooms &&
                rooms.length > 0 &&
                rooms.map(room => (
                    <Nav.Item  style={{marginTop:20}} componentClass={Link}  to={`/chat/${room.id}`}
                    key={room.id} panel="true"
                    eventKey={`/chat/${room.id}` }> 
                    <RoomCard setCurrentRoomId={setCurrentRoom} room={room} />
                    </Nav.Item>
               
            ))}
            

        </Nav>
        </Paper>
       
    );
        }

export default ChatRoomList;