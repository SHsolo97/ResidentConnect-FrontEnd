import React, {useEffect, useState} from "react";
import { orange } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import EventCard from "./EventCard.js"
import axios from "axios";

const EventsList= (props) =>{
  const [events,setEvents]=useState([]);
  const history = useHistory();
 
  
  const communityid=props.cid;
 useEffect( function effectfunction() { async function getEventDetails(){ 
   
 
    // eslint-disable-next-line no-use-before-define
   
    if(props.link==="community"){
    console.log(`communityid : ${communityid}`);
   
    var apiBaseUrl = "http://localhost:4003/api/events/"+props.link+"/"+communityid;
 }
 else if(props.link==="city"){
  var apiBaseUrl = "http://localhost:4003/api/events/"+props.link+"/"+props.cname;
 }
 else {
  var apiBaseUrl = "http://localhost:4003/api/events/"+props.link+"/"+props.hostid;
 }
      
      let eventslist=[];
      await axios.get(apiBaseUrl)
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
      getEventDetails();          
 
},[]);
return(
        <section className="localEvents">
          <h2 style={{ color:"#3f51b5" }} >{props.heading} {props.cname} </h2>
          <div className="eventList" style={{ display: "flex", flexDirection: "row",   }}>
          { events.map(event=>(
                   <div>
                         <EventCard eventDetails={event} />
                   </div>
            ))}
          </div>
        </section>
    );
  }

export default EventsList;