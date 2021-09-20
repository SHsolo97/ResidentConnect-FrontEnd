import React from 'react';
import { Loader, Nav } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';
import { transformArrWithId } from '../../../misc/helpers';
import { useRooms } from '../../../context/rooms.context';
import { useProfile } from '../../../context/profile.context';
import {RoomCard} from './RoomCard';
import { CircularProgress, Grid, Paper, TextField } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { auth,database } from '../../../misc/firebase';
import { transformToArr } from '../../../misc/helpers';
import { JoinRoomCard } from './JoinRoomCard';
import { useRoomsRequests } from '../../../context/roomsrequest.context';
import { useCommunity } from '../../../context/community.context';

const ChatRoomList = ({ setCurrentRoomId, aboveElHeight }) => {
    const rooms = useRooms();
    const roomsrequests=useRoomsRequests();
    
    
    const {user}=useProfile();
    //const communityid=user.communities[0];
    const {community}=useCommunity();
    const communityid=community._id;
    //const c_rooms=rooms.find(room => room.communityid === communityid);
    const location = useLocation();
    const setCurrentRoom=(roomid)=>{
        console.log(roomid);
        setCurrentRoomId(roomid);
    } 

  

    

    return (
        <div>
        <div >
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <Search />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Search" />
          </Grid>
        </Grid>
      </div>
        <Paper style={{height: 600, overflow: 'auto'}}>
        <Nav
        appearance="subtle"
        vertical
        reversed
        
        style={{ height: `calc(100% -${aboveElHeight}px)` }}
        activeKey={location.pathname} 
    >
            {!rooms && (<CircularProgress/>)}
            
            {rooms &&
                rooms.length > 0 &&
                rooms.map((room,index) => (
                    transformToArr(room.members).includes(auth.currentUser.uid)
                    ? 
                    <Nav.Item  style={{listStyleType:'none', marginTop:20}} componentClass={Link}  to={`/chat/${room.id}`}
                    key={room.id} panel="true"
                    eventKey={`/chat/${room.id}` }> 
                  
                    <RoomCard setCurrentRoomId={setCurrentRoom} room={room} />
                    </Nav.Item>
                    :
                    <Nav.Item  style={{listStyleType:'none', marginTop:20}} componentClass={Link}  to={`/chat/${room.id}`}
                    key={room.id} panel="true"
                    eventKey={`/chat/${room.id}` }> 
                    <JoinRoomCard room={room} />
                    </Nav.Item>


                  
               
            ))}
            

        </Nav>
        </Paper>
        </div>
    );
        }

export default ChatRoomList;