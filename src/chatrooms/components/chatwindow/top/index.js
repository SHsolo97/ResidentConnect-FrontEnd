import React, { memo } from 'react';

import { useCurrentRoom } from '../../../../context/currentroom.context';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';
import RoomInfoBtnModal from './RoomInfoBtnModal';


import { SectionHeader } from '../../../../shared/components/SectionHeader';
import { Grid } from '@material-ui/core';
import RequestInfoBtnModal from './RequestInfoBtnModal';

const ChatTop = () => {
const name = useCurrentRoom(v => v.name);

const isAdmin = useCurrentRoom(v => v.isAdmin);

return (
<div>
  <Grid container direction="row" justifyContent="space-between" alignItems="center">

    <SectionHeader>{name}</SectionHeader>
    <Grid items direction="row" justifyContent="flex-start" alignItems="center">

    {isAdmin &&
    <EditRoomBtnDrawer />
    }
      <RequestInfoBtnModal/>
      </Grid>
  </Grid>


    <div>
      
  <RoomInfoBtnModal />

  </div>
</div>
);
}

export default memo(ChatTop);