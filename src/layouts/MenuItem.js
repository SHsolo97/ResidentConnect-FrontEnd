import React from 'react';
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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import { useHistory } from 'react-router-dom';
import ViewListIcon from '@material-ui/icons/ViewList';
import PanToolIcon from '@material-ui/icons/PanTool';
import StoreIcon from '@material-ui/icons/Store';
import { useProfile } from '../context/profile.context';
export const MenuItem = ({children,...props}) => {
    const {user}=useProfile();
    const userType=user.type;
    const menuName=children;
    const history =useHistory();
    const handleMenu=()=>{
        console.log(menuName);
        if(userType==='Resident')
        {
        switch(menuName) {
            case 'Dashboard':
                history.push('/dashboardR');  
              break;
            case 'Payments':
              history.push('/paymentR'); 
              break;
            case 'Chat Rooms':
              history.push('/chatroomR'); 
              break;
           
            case 'Classifieds':
              history.push('/classifieds'); 
              break;
            case 'Events':
              history.push('/events'); 
              break;  
            case 'Polling':
              history.push('/pollings');
              break;   
            case 'Buy & Sell':
              history.push('/buyandsell'); 
              break;
            case 'Facilties':
              history.push('/facilityR'); 
              break;   
            case "Visitors":
              history.push('/visitorsR');
              break;
            case "Car Pooling":
              history.push('/carpolling');
              break;
            case "Contacts":
              history.push('/contactsR');
              break;
            case "Maintenance":
              history.push('/maintenance');
              break;
              
            default:
              break;
              
          }
        }
        else
        {
          switch(menuName) {
            case 'Dashboard':
                history.push('/dashboardA');  
              break;
            case 'Payments':
              history.push('/paymentA'); 
              break;
            case 'Chat Rooms':
              history.push('/chatroomA'); 
              break;
           
            case 'Classifieds':
              history.push('/classifieds'); 
              break;
            case 'Events':
              history.push('/events'); 
              break;  
            case 'Polling':
              history.push('/pollings');
              break;   
            case 'Buy & Sell':
              history.push('/buyandsell'); 
              break;
            case 'Facilties':
              history.push('/facilityA'); 
              break;   
            case "Visitors":
              history.push('/visitorsA');
              break;
            case "Car Pooling":
              history.push('/carpolling');
              break;
            case "Contacts":
              history.push('/contactsA');
              break;
            case "Maintenance":
              history.push('/maintenance');
              break;
              
            default:
              break;
              
          }

        }
    }
   
    
    return (
        <ListItem button key={menuName} onClick= {handleMenu}>
          {menuName==='Maintenance' &&  <ListItemIcon> <PanToolIcon /> </ListItemIcon>} 
          {menuName==='Dashboard' &&  <ListItemIcon> <DashboardIcon /> </ListItemIcon>}  
            {menuName==='Apartments' &&  <ListItemIcon> <ApartmentIcon /> </ListItemIcon>}  
            {menuName==='Facilties' &&  <ListItemIcon>  <StoreIcon  /> </ListItemIcon>}  
            {menuName ==='Profile' &&  <ListItemIcon>  <PersonIcon /> </ListItemIcon>}  
            {menuName==='Polling' &&  <ListItemIcon> <PollIcon /> </ListItemIcon>}  
           {menuName ==='Events' &&  <ListItemIcon> <CalendarTodayIcon /> </ListItemIcon>}  
            {menuName ==='Chat Rooms' && <ListItemIcon> <PeopleAltIcon /> </ListItemIcon>}  
           {menuName ==='Car Pooling' &&  <ListItemIcon> <DriveEtaIcon /> </ListItemIcon>} 
           {menuName === 'Buy & Sell' && <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon> } 
           {menuName === 'Classifieds' && <ListItemIcon> <ViewListIcon /> </ListItemIcon> } 
            {menuName==='Payments' &&  <ListItemIcon> <PaymentIcon /> </ListItemIcon>}  
           {menuName ==='Contacts' &&  <ListItemIcon> <ContactsIcon /> </ListItemIcon>}  
            {menuName==='Visitors' &&   <ListItemIcon> <TransferWithinAStationIcon /> </ListItemIcon>}  
        <ListItemText primary={menuName} />
      </ListItem>
    )
}
