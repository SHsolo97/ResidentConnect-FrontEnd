import { Divider } from '@material-ui/core';
import React, { useRef, useState, useEffect }  from 'react';
import { SectionHeader } from '../../shared/components/SectionHeader';


import ChatRoomList from './rooms/ChatRoomList';

const SideBar = ({...props}) => {
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
        <div >
            <SectionHeader>Join Conversation</SectionHeader>
               
            <Divider/>
                <div>
                    <ChatRoomList  setCurrentRoomId={setCurrentRoom} aboveElHeight={height}/>
                </div>
            
        </div>


        )
}
export default SideBar;
