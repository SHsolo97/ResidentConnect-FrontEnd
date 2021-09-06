
import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import Home from './home'
import CreateRoomBtnModal from '../components/CreateRoomBtnModal'
const ResidentChatroom = () => {
    return (<div>   
        <PageHeader> Chat Rooms</PageHeader>
        <CreateRoomBtnModal />
        <Home/> </div>);
}

export default ResidentChatroom
