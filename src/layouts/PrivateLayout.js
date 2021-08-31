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
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ApartmentIcon from '@material-ui/icons/Apartment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PollIcon from '@material-ui/icons/Poll';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import PaymentIcon from '@material-ui/icons/Payment';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ContactsIcon from '@material-ui/icons/Contacts';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { MenuItem } from './MenuItem';
import { useHistory } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../misc/firebase';


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
   
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

    const showApartmentDetails=()=>{
      console.log('Show Apartment deetails');
    }
    const signOut=()=>{
      auth.signOut().then(() => {
        history.push('/signin');
    }).catch((error) => {
      console.log(error);
    });
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
            
                  <Typography variant="h6" noWrap>
              Residents Connect
            </Typography>
            </Grid>
            <Grid container  direction="row" justifyContent="flex-end" alignItems="center">

            <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <ApartmentIcon  onClick={showApartmentDetails}/>
            </IconButton >
            <IconButton color="inherit">
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
          <MenuItem role='admin'>Dashboard</MenuItem>
         
           
           <MenuItem role='admin'>Facilties</MenuItem>
           <MenuItem role='admin'>Events</MenuItem>
           <MenuItem role='admin'>Chat Rooms</MenuItem>
           <MenuItem role='admin'>Buy &amp; Sell</MenuItem>
           <MenuItem role='admin'>Classifieds</MenuItem>
           <MenuItem role='admin'>Polling</MenuItem>
           <MenuItem role='admin'>Payments</MenuItem>
           <MenuItem role='admin'>Car Pooling</MenuItem>
         
           <MenuItem role='admin'>Visitors</MenuItem>
           <MenuItem role='admin'>Maintenance</MenuItem>
           <MenuItem role='admin'>Contacts</MenuItem>
           
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