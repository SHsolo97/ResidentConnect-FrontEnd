import React from 'react';
import { Loader, Nav ,Sidenav} from 'rsuite';
import { Link, useLocation } from 'react-router-dom';

import { useRooms } from '../../../context/rooms.context';
import RoomItem from './RoomItem';
import { useProfile } from '../../../context/profile.context';
import {RoomCard} from './RoomCard';

const ChatRoomList = ({ setCurrentRoomId, aboveElHeight }) => {
    const rooms = useRooms();
    const {user}=useProfile();
    const communityid=user.communities[0];
    //const c_rooms=rooms.find(room => room.communityid === communityid);
    const location = useLocation();
    const setCurrentRoom=(roomid)=>{
        console.log(roomid);
        setCurrentRoomId(roomid);
    } 
    return (
       <Nav
        appearance="subtle"
        vertical
        reversed
        className="overflow-y-scroll custom-scroll h-100"
        style={{ height: `calc(100% -${aboveElHeight}px)` }}
        activeKey={location.pathname} 
    >
            {!rooms && (<Loader center vertical content="Loading" speed="slow" size="md" />)}
            {rooms &&
                rooms.length > 0 &&
                rooms.map(room => (
                    <Nav.Item  componentClass={Link}  to={`/chat/${room.id}`}
                    key={room.id} panel="true"
                    eventKey={`/chat/${room.id}` }> 
                    <RoomCard setCurrentRoomId={setCurrentRoom} room={room} />
                    </Nav.Item>
               
            ))}
            

        </Nav>
       
    );
        }

export default ChatRoomList;