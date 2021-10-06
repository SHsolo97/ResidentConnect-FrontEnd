/* eslint-disable array-callback-return */
import React,{useEffect} from 'react'
import {fetchMyRides,fetchRideRequestsByRideId} from '../actions/index';
import { connect } from 'react-redux';
import { useProfile } from '../../context/profile.context';
import {MyRideCard} from '../components/MyRideCard';
import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';

export const MyRides = ({...props}) => {
    const {user}=useProfile();
    const {fetchMyRides}=props;
    useEffect(() => {
        fetchMyRides(user._id);
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const rejectRide=async(_id)=>{
   
        var apiBaseUrl = `/carpoolings/riderequests/${_id}`;
    
        await carPoolingAPI.put(apiBaseUrl, {status:'rejected',rejectionreason:'Ride Cancelled'})
          .then(function (response) {
            if (response.status === 200) {
             // console.log(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
           
          });
    }

    const cancelRide=async(_id)=>{
       // console.log('cancel ride');
   
        var apiBaseUrl = `/carpoolings/rides/${_id}`;
    
        await carPoolingAPI.put(apiBaseUrl, {status:'cancelled'})
          .then(function (response) {
            if (response.status === 200) {
             // console.log(response.data);
              props.fetchRideRequestsByRideId(_id);
              if(props.ridereqs!=null)
              {
                props.ridereqs.map(ridereq=>
                    {
                        rejectRide(ridereq._id);
                    });
                
              }
              //cancel all pending/approved requests
              props.fetchMyRides(user._id);

            }
          })
          .catch(function (error) {
            console.log(error);
           
          });
    }
    const renderRides=()=>{
      if(props.rides.length===0)
      {
        return <div style={{color:'red',fontSize:'32px', marginTop:'150px',marginLeft:'400px'}}> No Rides</div>
      }
      return(
        props.rides.map(ride=>{
          return  <MyRideCard key={ride._id} ride={ride} cancelRide={cancelRide}/>
     })

      )
    }
    return (
        <div>
         { props.rides !=null && renderRides() }
        </div>
    )
}
const mapStateToProps = state => {
       return {
        ridereqs: state.ridereqs,
        rides: state.rides.filter(ride=>ride.status==='active')};
  };
  
  export default connect(
    mapStateToProps,
    { fetchMyRides,fetchRideRequestsByRideId}
  
  )(MyRides);