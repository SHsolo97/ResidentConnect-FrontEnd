import React, {useEffect, useState} from "react";
import { orange } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import EventCard from "./EventCard.js"
import axios from "axios";
import eventAPI from '../../misc/axios-calls/eventAPI';
import Carousal from 'react-material-ui-carousel'
import {Button} from '@material-ui/core';

const EventsList= ({...props}) =>{
  const [events,setEvents]=useState([]);
  const history = useHistory();
 
  
  const communityid=props.cid;
  const getEventDetails= async()=>{
    var apiBaseUrl =null;
    if(props.link==="community")  
        apiBaseUrl = `/events/${props.link}/${communityid}`; 
    else if(props.link==="city")
        apiBaseUrl = `/events/${props.link}/${props.cname}`;
    else 
        apiBaseUrl = `/events/${props.link}/${props.hostid}`;
 
      
      let eventslist=[];
      await eventAPI.get(apiBaseUrl)
          .then(function (response) {
              if (response.status === 200) {
                  eventslist=response.data.events;          
                  setEvents(eventslist);
              }
             
              else {
                console.log("Error on Events retrieval");
            
            }

        })
       
        .catch(function (error) {
         
            console.log(error);
        });
      }
  
  useEffect(() => {
   
 
      getEventDetails();          
     // eslint-disable-next-line no-use-before-define   

},[]);
var n=3;
if(events.length<3){
  n=events.length;
}
const items=[];
for (let i = 0; i < events.length; i += n) {
  if (i % n === 0) {
    items.push(
      events.slice(i,i+n).map((da,index)=>{
        return (<div className="eventList" style={{ display: "inline-block"  }}><EventCard key={index.toString()} eventDetails={da} /></div>);
      })
    )
  }
}
return(
        <section className="localEvents">
          <h2 style={{ color:"#3f51b5" }} >{props.heading} {props.cname} </h2>
          <div className="eventList" style={{ display: "flex", flexDirection: "row",   }}>
          <Carousal NavButton={({onClick, className, style, next, prev}) => {
        // Other logic

        return (
            <Button onClick={onClick} className={className} style={style}>
                {next && "Next"}
                {prev && "Previous"}
            </Button>
        )
    }} 
> 
          {items}
            </Carousal>
          </div>
        </section>
    );
  }

export default EventsList;