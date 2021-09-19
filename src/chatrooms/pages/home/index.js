import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { RoomsProvider } from '../../../context/rooms.context';
import { useMediaQuery } from '../../../misc/custom-hooks';
import Chat from './Chat';
import { Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { RoomsRequestsProvider } from '../../../context/roomsrequest.context';

const Home = () => {
const isDesktop = useMediaQuery(`(min-width: 992px)`);
const { isExact } = useRouteMatch();
const canRenderSideBar = isDesktop || isExact;
const location = useLocation();
const [currentRoomId,setCurrentRoomId]=React.useState(null);;
const setCurrentRoom=(roomid)=>{
console.log(roomid);
setCurrentRoomId(roomid);
}
return (
<RoomsProvider>
  <RoomsRequestsProvider>
  <Grid container direction="row" justifyContent="space-between" alignItems="stretch" spacing={3}>
    <Grid item xs={4}>
      {canRenderSideBar &&
      <SideBar setCurrentRoomId={setCurrentRoom} />

      }
    </Grid>
    <Grid item xs={8}>
      {currentRoomId!=null?
      <Chat>{currentRoomId}</Chat>
      :
      <h2 > Please select chat </h2>
      }
    </Grid>
  </Grid>
  </RoomsRequestsProvider>
</RoomsProvider>
)

}
export default Home;