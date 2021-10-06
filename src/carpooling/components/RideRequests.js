/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux';
import {fetchReceivedRideRequestsDetails,fetchRideRequestsByRideOwner} from '../actions/index';
import { useProfile } from '../../context/profile.context';
import RideRequestCard from './RideRequestCard';
import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';

export const RideRequests = ({...props}) => {
    const {user} =useProfile();
    React.useEffect(() => {
        props.fetchReceivedRideRequestsDetails(user._id);
        
    },[user._id])
    const rejectRide=async(_id,rejectReason)=>{
   
        var apiBaseUrl = `/carpoolings/riderequests/${_id}`;
    
        await carPoolingAPI.put(apiBaseUrl, {status:'rejected',rejectionreason:rejectReason})
          .then(function (response) {
            if (response.status === 200) {
              console.log(response.data);
              props.fetchRideRequestsByRideOwner(user._id);

            }
          })
          .catch(function (error) {
            console.log(error);
           
          });
    }
    const approveRide=async(_id)=>{
        var apiBaseUrl = `/carpoolings/riderequests/${_id}`;
    
        await carPoolingAPI.put(apiBaseUrl, {status:'approved'})
          .then(function (response) {
            if (response.status === 200) {
              console.log(response.data);
              props.fetchReceivedRideRequestsDetails(user._id);

            }
          })
          .catch(function (error) {
            console.log(error);
           
          });
    }
    const renderRideRequestCard=()=>{
            return props.ridereqs.map(ridereq=>
                {
              
                        return  <RideRequestCard rejectRide={rejectRide}  approveRide={approveRide} ridereq={ridereq} />
                      
                }
             ) }
    return (
        <div>
      {props.ridereqs!=null &&

        renderRideRequestCard()
      }
      </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    return { 
        ridereqs: state.ridereqs.filter(ridereq=>ridereq.status==='pending')
        
    };
};

export default connect(
    mapStateToProps,
    {fetchReceivedRideRequestsDetails,fetchRideRequestsByRideOwner}  
  )(RideRequests);