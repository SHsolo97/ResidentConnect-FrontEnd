import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import Home from './home'
import CreateRoomBtnModal from '../components/CreateRoomBtnModal'
import Grid from '@mui/material/Grid';

const AdminChatroom = () => {
    return (<div>   
        <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>
        <PageHeader> Chat Rooms</PageHeader>
        <CreateRoomBtnModal />
        </Grid>
        <Home/> </div>);
}

export default AdminChatroom
