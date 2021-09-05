import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useCurrentRoom } from '../../../../context/currentroom.context';
import { useMediaQuery } from '../../../../misc/custom-hooks';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';
import RoomInfoBtnModal from './RoomInfoBtnModal';
import { Avatar } from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { SectionHeader } from '../../../../shared/components/SectionHeader';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
root: {
display: 'flex',
'& > *': {
margin: theme.spacing(1),
},
},
orange: {
color: theme.palette.getContrastText(deepOrange[500]),
backgroundColor: deepOrange[500],
},
purple: {
color: theme.palette.getContrastText(deepPurple[500]),
backgroundColor: deepPurple[500],
},
}));
const ChatTop = () => {
const classes = useStyles();
const name = useCurrentRoom(v => v.name);

const isAdmin = useCurrentRoom(v => v.isAdmin);
const isMobile = useMediaQuery(`(max-width:992px)`);

return (
<div>
  <Grid container direction="row" justifyContent="space-between" alignItems="center">

    <SectionHeader>{name}</SectionHeader>
    {isAdmin &&
    <EditRoomBtnDrawer />
    }
  </Grid>


    <div>
  <RoomInfoBtnModal />
  </div>
</div>
);
}

export default memo(ChatTop);