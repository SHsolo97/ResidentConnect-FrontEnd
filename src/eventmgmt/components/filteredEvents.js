import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import EventCard from "./EventCard.js"
import axios from "axios";

const FilteredEventsList= (props) =>{
  const [events,setEvents]=useState([]);
  const history = useHistory();
  useEffect( function effectfunction() { async function getEventDetails(){ 
   
 
    // eslint-disable-next-line no-use-before-define
    var apiBaseUrl = "http://localhost:4003/api/events/allevents/search";
      
      let eventslist=[];
      await axios.get(apiBaseUrl)
          .then(function (response) {
              if (response.status === 200) {
                  eventslist=response.data.events;
                  console.log(eventslist);
                  const filteredEvents=eventslist.filter(eventslist =>{
                    return ((eventslist.city===(props.City) || eventslist.mode===(props.Type)) || eventslist.category===(props.Category) );
                  })
                  setEvents(filteredEvents);

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
 
},[events]);
return( 

        <section className="localEvents">
          <h2 style={{ color:"#3f51b5" }} >{props.heading} </h2>
          <div className="eventList" style={{ display: "flex", flexDirection: "row",   }}>
          { events.map(event=>(
                   <div>
                         <EventCard eventDetails={event} Category={props.Category} Type={props.Type} City={props.City} />
                   </div>
            ))}
          </div>
        </section>
    );
  }

export default FilteredEventsList;