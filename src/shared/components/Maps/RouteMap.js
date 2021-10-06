import React, { useRef, useEffect } from 'react';

  
import './Map.css';

const RouteMap = props => {
  const mapRef = useRef();
  const directionsService = new window.google.maps.DirectionsService();
  const directionsRenderer = new window.google.maps.DirectionsRenderer();
 

  const { origin,destination,waypoints,center, zoom } = props;

  const calculateAndDisplayRoute=(directionsService, directionsRenderer) =>{
    const waypts = [];
    console.log("calculateAndDisplayRoute");
    for (let i = 0; i < waypoints.length; i++) {
     
        waypts.push({
          location: waypoints[i],
          stopover: true,
        });
      }

      
      directionsService
    .route({
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode:  window.google.maps.TravelMode.DRIVING

      
    },function(response, status){
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      }
      //const summaryPanel = document.getElementById("directions-panel");

      // summaryPanel.innerHTML = "";

      // // For each route, display summary information.
      // for (let i = 0; i < route.legs.length; i++) {
      //   const routeSegment = i + 1;

      //   summaryPanel.innerHTML +=
      //     "<b>Route Segment: " + routeSegment + "</b><br>";
      //   summaryPanel.innerHTML += route.legs[i].start_address + " to ";
      //   summaryPanel.innerHTML += route.legs[i].end_address + "<br>";
      //   summaryPanel.innerHTML += route.legs[i].distance.text + "<br><br>";
      // }
    })
    //.catch((e) => console.log("Directions request failed due to ")));
    
   }
   useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
  
     new window.google.maps.Marker({ position: center, map: map });
    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsRenderer);

    

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center,zoom,directionsService,directionsRenderer]);  

 
  
  return (
    <div
      ref={mapRef}
      style={{width:props.width,height:props.height}}
    ></div>
  );
};

export default RouteMap;
