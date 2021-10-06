/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './PrivateLayout.css'
import Grid from '@material-ui/core/Grid';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useModelState } from '../misc/custom-hooks';

import ApartmentIcon from '@material-ui/icons/Apartment';

import { CustumMenuItem } from './MenuItem';
import { useHistory } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../misc/firebase';
import { useCommunity } from '../context/community.context';
import { useProfile } from '../context/profile.context';
import { useEffect } from 'react';
import logo from '../images/home/logo.png';
import {CreateAnnouncementModal} from '../announcements/pages/CreateAnnouncementModal';
import userAPI from '../misc/axios-calls/userAPI';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const PrivateLayout = ({ children }) => {
  const { isOpen, open, close } = useModelState();
  
  const {communityList,community} = useCommunity();
  const {user,setUser} = useProfile();
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const history = useHistory();
  const communitynames= new Map();
  

    const handleDrawerOpen = () => {
      setOpenDrawer(true);
    };
    useEffect(() => {
      communityList.map(community => (
        communitynames.set(community.id,community.name)
      )
      );

    }, [communityList]);

    const handleDrawerClose = () => {
      setOpenDrawer(false);
    };
    const goToAparmentSettings=()=>{

      console.log('Goto Aparment Settings');
      if(user.type==='resident')
        history.push('/apartmentprofile');
      if(user.type==='admin')
        history.push('/updateCommunityProfile');

    }
    const editUser=async(profileData)=>{
  
      var apiBaseUrl = `/users/${user._id}`  
      await userAPI.put(apiBaseUrl,profileData )
           .then(function (response) {
               if (response.status === 200)
    
              {
                  const updatedUserDetails=response.data
                  console.log(updatedUserDetails);
                  history.push('/signin');
                 
                
              }
           })
           .catch(function (error) {
               console.log(error);
                
           });
    } 
    
    const signOut=()=>{
      auth.signOut().then(() => {
        const profileData={lastlogin:new Date()}
        editUser(profileData);
    }).catch((error) => {
      console.log(error);
    });
      }
   
      const openProfileSettings=()=>{
        history.push('/profile');
      }
 
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: openDrawer,
          })}
        >
        <Toolbar>
        <Grid container  direction="row" justifyContent="flex-start" alignItems="center">
           <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: openDrawer,
              })}
            >
              <MenuIcon />
            </IconButton>
              <img  alt="logo" src={logo}/>
                  <Typography variant="h6" noWrap>
              Residents Connect
            </Typography>
            </Grid>
            <Grid container  direction="row" justifyContent="flex-end" alignItems="center">

            <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <ApartmentIcon  onClick={goToAparmentSettings}/>
            </IconButton >
            
            <IconButton color="inherit" onClick={openProfileSettings}>
              <AccountCircle />
            </IconButton >
           { user.type==='admin' ?
            <IconButton  onClick={open} color="inherit">
                <NotificationsIcon />             
            </IconButton>:
            null}
            <IconButton color="inherit" edge="end" onClick={signOut}>
              <ExitToAppIcon />
            </IconButton>
            
            </div>
            </Grid>
            </Toolbar>
            
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: openDrawer,
              [classes.drawerClose]: !openDrawer,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
          <CustumMenuItem >Dashboard</CustumMenuItem>  
           
          {community.paidservices.facility && <CustumMenuItem >Facilties</CustumMenuItem>}
           <CustumMenuItem>Events</CustumMenuItem>
           <CustumMenuItem >Chat Rooms</CustumMenuItem>
           <CustumMenuItem >Buy &amp; Sell</CustumMenuItem>
           <CustumMenuItem>Classifieds</CustumMenuItem>
           {community.paidservices.polling && <CustumMenuItem >Polling</CustumMenuItem> }
           <CustumMenuItem >Payments</CustumMenuItem>
           {community.paidservices.carpooling && <CustumMenuItem>Car Pooling</CustumMenuItem>}     
           {community.paidservices.visitor && <CustumMenuItem >Visitors</CustumMenuItem>}
           {community.paidservices.maintenance && <CustumMenuItem >Maintenance</CustumMenuItem>}
           <CustumMenuItem >Contacts</CustumMenuItem>
           
          </List>
          
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="main">{children}</div>
        </main>
        {isOpen&&
          <CreateAnnouncementModal open={open} handleClose={close}/>
        }
      </div>
    );
}


export default PrivateLayout; 