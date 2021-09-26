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
    return (
        <div>
        { props.rides !=null && 
        props.rides.map(ride=>{
                    return  <MyRideHistoryCard ride={ride}/>
               })}
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