import { Divider, Paper } from '@material-ui/core';
import React, { useRef, useState, useEffect }  from 'react';

import {useProfile} from '../../context/profile.context';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ChatRoomList from './rooms/ChatRoomList';
import { Avatar } from '@mui/material';

const SideBar = ({...props}) => {
    const {user} =useProfile();
    const topSidebarRef = useRef();
    const [height, setHeight] = useState(0);
    const [myRoomsOnly, setMyRoomsOnly] = React.useState(true);

    const setCurrentRoom=(roomid)=>{
        //console.log(roomid);
        props.setCurrentRoomId(roomid);
    }
    useEffect(() => {
        if (topSidebarRef.current) {
            setHeight(topSidebarRef.current.scrollHeight);
        }

    }, [topSidebarRef]);
    const handleMyRooms=(event)=>{
        setMyRoomsOnly(event.target.checked);
        event.preventDefault();
        event.stopPropagation();

    }
    return (
        <Paper  >
            <div style={{padding:'16px'}}>
            <Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
>              
      
             <Avatar style={{marginTop:'10px',marginLeft:'10px', marginBottom:'10px'}}  src={user.avatar}/>
             <span style={{fontSize:'24px', paddingLeft:'10px'}}> {'  '} {user.firstname} {user.lastname}     </span>
       
           
             </Grid>
             <Grid
  container
  direction="row"
  justifyContent="flex-end"
  alignItems="center"
>              
             <FormControlLabel  checked ={myRoomsOnly} value='myrooms' labelPlacement='end'
              onChange={handleMyRooms}
      control={<Checkbox />}
      label="My Rooms"
    />
    </Grid>
            <Divider style={{ background:'orange'}}/>
                <div>
                    <ChatRoomList  myRoomsOnly={myRoomsOnly} setCurrentRoomId={setCurrentRoom} aboveElHeight={height}/>
                </div>
            </div>
        </Paper>


        )
}
export default SideBar;
