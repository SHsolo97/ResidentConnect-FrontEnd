import { Divider, Paper } from '@material-ui/core';
import React, { useRef, useState, useEffect }  from 'react';
import { SectionHeader } from '../../shared/components/SectionHeader';
import {useProfile} from '../../context/profile.context';
import Grid from '@mui/material/Grid';

import ChatRoomList from './rooms/ChatRoomList';
import { Avatar } from '@mui/material';

const SideBar = ({...props}) => {
    const {user} =useProfile();
    const topSidebarRef = useRef();
    const [height, setHeight] = useState(0);
    const setCurrentRoom=(roomid)=>{
        console.log(roomid);
        props.setCurrentRoomId(roomid);
    }
    useEffect(() => {
        if (topSidebarRef.current) {
            setHeight(topSidebarRef.current.scrollHeight);
        }

    }, [topSidebarRef]);
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
             <div style={{fontSize:'24px', paddingLeft:'10px'}}> {'  '} {user.firstname} {user.lastname}     </div>
             </Grid>
            <Divider style={{ background:'orange'}}/>
                <div>
                    <ChatRoomList  setCurrentRoomId={setCurrentRoom} aboveElHeight={height}/>
                </div>
            </div>
        </Paper>


        )
}
export default SideBar;
