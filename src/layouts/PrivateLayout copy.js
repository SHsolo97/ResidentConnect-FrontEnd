import React from 'react';
import './PrivateLayout.css'
const PrivateLayout = ({ children, ...props }) => {
    

    const usertype =props.usertype;
   
    return (
        
        <div className="container">
            
            <h1 className='App-header title '>&nbsp;&nbsp; &nbsp;&nbsp;  Resident Connect </h1>   
            
            <div className="bg-image"   >

            <nav className="site-nav">
               
                   

                    {
                        usertype === 'resident' ?
                        <ul className="mainnav" >
                             <li ><a href="/dashboardR">Dashboard</a></li>
                             <li ><a href="/paymentR"> Payment </a> </li>
                             <li ><a href="/chatroomR">Chatroom</a></li>
                             <li ><a href="/buyandsell">Buy and Sell</a></li>
                             <li ><a href="/events">Event Management</a></li>
                             <li ><a href="/facilties">Facility Booking</a></li>
                             <li ><a href="/classifieds">Classifieds</a></li>
                             <li ><a href="/carpolling">Car Pooling</a></li>
                             <li ><a href="/visitorsR">Visitors</a></li>
                             <li ><a href="/contactsR">Contacts</a></li>
                             </ul>
                        :
                        <ul className="mainnav" >
                              <li ><a href="/dashboardA">Dashboard</a></li>
                              <li ><a href="/apartments">Apartments</a></li>
                              <li ><a href="/chatroomA">Chatroom</a></li>

                              <li ><a href="/announcement">Announcements</a></li>
                              <li ><a href="/visitorsA">Visitors</a></li>
                              <li ><a href="/paymentA"> Payment </a> </li>
                              <li ><a href="/contactsA">Contacts</a></li>
                             </ul>

                    }
                  

                  
                   
                </nav>
               </div>
            <div className="main">{children}</div>
        </div>
    )
}


export default PrivateLayout; 