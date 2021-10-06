import React,{useEffect} from 'react'
import {fetchMyRides} from '../actions/index';
import { connect } from 'react-redux';
import { useProfile } from '../../context/profile.context';
import {MyRideHistoryCard} from './MyRideHistoryCard';

export const MyRideHistory = ({...props}) => {
    const {user}=useProfile();
    useEffect(() => {
        props.fetchMyRides(user._id);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user._id])
    const renderRides=()=>{
      if(props.rides.length===0)
      {
        return <div style={{color:'red',fontSize:'32px', marginTop:'150px',marginLeft:'400px'}}> No Rides</div>
      }
        return(
          props.rides.map(ride=>{
                    return  <MyRideHistoryCard ride={ride}/>
               })
        )
    }
    return (
        <div>
        { props.rides !=null && 
        renderRides()
        }
       </div>
    )
}
const mapStateToProps = state => {
    return { rides: state.rides.filter(ride=>ride.status!=='active')};

  };
  
  export default connect(
    mapStateToProps,
    { fetchMyRides}
  
  )(MyRideHistory);