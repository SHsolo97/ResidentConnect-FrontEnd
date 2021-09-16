import React, { Component } from 'react';
import { Route } from 'react-router-dom';
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

import ApartmentIcon from '@material-ui/icons/Apartment';

import { CustumMenuItem } from './MenuItem';
import { useHistory } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../misc/firebase';
import { useCommunity } from '../context/community.context';
import { useApartment } from '../context/apartment.context';
import { useProfile } from '../context/profile.context';
import Menu from '@material-ui/core/Menu';
import { useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import {  InputBase} from '@material-ui/core';
import logo from '../images/home/logo.png';

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
  const {community,communityList} = useCommunity();
  const {apartment,apartmentList} = useApartment();
  const {user} = useProfile();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openApartmentMenu = Boolean(anchorEl);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const communitynames= new Map();
  
  const handleApartmentMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSwitchProfile=(event)=>{
    console.log(event.target.id);
    event.preventDefault();
    event.stopPropagation();


  }
  const handleApartmentClose = () => {
    setAnchorEl(null);
  };

    const handleDrawerOpen = () => {
      setOpen(true);
    };
    useEffect(() => {
      communityList.map((community) => {
        communitynames.set(community.id,community.name);
      }
      )

    }, []);

    const handleDrawerClose = () => {
      setOpen(false);
    };
    const goToAparmentSettings=()=>{
      console.log('Goto Aparment Settings');
    }
  
    const signOut=()=>{
      auth.signOut().then(() => {
        history.push('/signin');
    }).catch((error) => {
      console.log(error);
    });
      }
   
      const openProfileSettings=()=>{
        history.push('/profile');
      }
   const getApartmentid = (block,floor,aptnum)=>
   {
    return `Block ${block}  Floor  ${floor} Flat ${aptnum}`
   }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
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
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
              <img src={logo}/>
                  <Typography variant="h6" noWrap>
              Residents Connect
            </Typography>
            </Grid>
            <Grid container  direction="row" justifyContent="flex-end" alignItems="center">

            <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <ApartmentIcon  onClick={handleApartmentMenu}/>
            </IconButton >
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openApartmentMenu}
                onClose={handleApartmentClose}
              >
                  {user.type==='resident'?
                 
                 <div>
                 {apartmentList.map((apartment) => {    
                      
                        return (<div>   
                          <InputBase  
                          inputProps={{ 'aria-label': 'naked' }}   
                             id = {apartment.communityid}  defaultValue={apartment.communityid} />
                        <MenuItem key={apartment.id}    onClick={handleSwitchProfile}  value={apartment.id}>
                        <InputBase  
                   inputProps={{ 'aria-label': 'naked' }}   onClick={handleSwitchProfile}   id = {apartment.id} defaultValue = {getApartmentid(apartment.block , apartment.floor, apartment.aptnum)}/>
                        
                  </MenuItem>
                        </div>)
                 }
                   )
                }
                   </div>
              
              
                : 
              
                 <div>
                 {communityList.map((community) => { 
                                  return <MenuItem onClick={goToAparmentSettings}>{community.name}</MenuItem>
   
                 })}
                </div>  

             
                }
              </Menu>
            <IconButton color="inherit" onClick={openProfileSettings}>
              <AccountCircle />
            </IconButton >
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
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
          <CustumMenuItem role='admin'>Dashboard</CustumMenuItem>
         
           
           <CustumMenuItem role='admin'>Facilties</CustumMenuItem>
           <CustumMenuItem role='admin'>Events</CustumMenuItem>
           <CustumMenuItem role='admin'>Chat Rooms</CustumMenuItem>
           <CustumMenuItem role='admin'>Buy &amp; Sell</CustumMenuItem>
           <CustumMenuItem role='admin'>Classifieds</CustumMenuItem>
           <CustumMenuItem role='admin'>Polling</CustumMenuItem>
           <CustumMenuItem role='admin'>Payments</CustumMenuItem>
           <CustumMenuItem role='admin'>Car Pooling</CustumMenuItem>
         
           <CustumMenuItem role='admin'>Visitors</CustumMenuItem>
           <CustumMenuItem role='admin'>Maintenance</CustumMenuItem>
           <CustumMenuItem role='admin'>Contacts</CustumMenuItem>
           
          </List>
          
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="main">{children}</div>
        </main>
      </div>
    );
}


export default PrivateLayout; 