import React, { useRef, useState, useEffect }  from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';
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
            <div >
                <CreateRoomBtnModal />
                <Divider> Join Conversation</Divider>
                <div>
                    <ChatRoomList  setCurrentRoomId={setCurrentRoom} aboveElHeight={height}/>
                </div>
            </div>
        </div>


        )
}
export default SideBar;
