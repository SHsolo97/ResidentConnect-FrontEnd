import React, { Component } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { Route } from 'react-router-dom';
import MiniDrawer from '../menus/components/MiniDrawer';
import './PrivateLayout.css'
const PrivateLayout = ({ children, ...props }) => {
    

    const userType =props.usertype;
    const menus=['Dashboard','Apartments','Events','Chat Rooms','Buy & Sell','Polling','Payments','Car Pooling','Announcements','Visitors','Contacts'];
    return (
        
       <MiniDrawer menus={menus} userType={userType} />
    )
}


export default PrivateLayout; 