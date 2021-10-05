import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
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
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from 'react-router-dom';


export const MenuItem = ({children,...props}) => {
    const menuName=children;
    return (
        <Link to='/dashboardOA'>
        <ListItem button key={menuName}>
            {menuName==='Dashboard' &&  <ListItemIcon> <DashboardIcon /> </ListItemIcon>}  
            {menuName==='Apartments' &&  <ListItemIcon> <ApartmentIcon /> </ListItemIcon>}  
            {menuName ==='Profile' &&  <ListItemIcon>  <PersonIcon /> </ListItemIcon>}  
            {menuName==='Polling' &&  <ListItemIcon> <PollIcon /> </ListItemIcon>}  
           {menuName ==='Events' &&  <ListItemIcon> <CalendarTodayIcon /> </ListItemIcon>}  
            {menuName ==='Chat Rooms' && <ListItemIcon> <PeopleAltIcon /> </ListItemIcon>}  
           {menuName ==='Car Pooling' &&  <ListItemIcon> <DriveEtaIcon /> </ListItemIcon>} 
           {menuName === 'Buy & Sell' && <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon> } 
           {menuName === 'Classifieds' && <ListItemIcon> <ShoppingCartIcon /> </ListItemIcon> } 
            {menuName==='Payments' &&  <ListItemIcon> <PaymentIcon /> </ListItemIcon>}  
           {menuName ==='Contacts' &&  <ListItemIcon> <ContactsIcon /> </ListItemIcon>}  
           {menuName ==='Announcements' &&  <ListItemIcon> <AddAlertIcon /> </ListItemIcon>}  
            {menuName==='Visitors' &&   <ListItemIcon> <TransferWithinAStationIcon /> </ListItemIcon>}  
        <ListItemText primary={menuName} />
      </ListItem>
      </Link>
      
    )
}
