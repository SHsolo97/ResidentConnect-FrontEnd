import React from 'react'
import { connect } from 'react-redux';
import {filterRideWithUser} from '../actions/index';
import SearchRideCard from './SearchRideCard';
export const RideResult = ({...props}) => {
    
    React.useEffect(() => {
        if(typeof props.filter !== "undefined")
            props.filterRideWithUser(props.filter);      
           console.log(props.rides);
 
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.filter])
    const renderRides=()=>{
        return props.rides.map(ride=>{
            return <SearchRideCard 
                requestesSeats={typeof props.filter !== "undefined" ? props.filter.seats:0} ride={ride}/>
    })}
    return (
        <div>
           
        
           {typeof props.filter !== "undefined"?
                       <div> 
                          <h3> ( {props.rides.length}) found </h3>

                            {renderRides()}
                
                        
                          
                  </div>:
                   <h3> No Results </h3>
          
           }
        </div>
    )
}
const mapStateToProps = state => {
    return { rides: state.rides};
};

export default connect(
    mapStateToProps,
    {filterRideWithUser}  
  )(RideResult);