/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { connect } from 'react-redux';
import { useProfile } from '../../context/profile.context';
import {fetchMyRideRequestsDetails} from '../actions/index';
import MyRideRequestCard from './MyRideRequestCard';
import {Progress} from '../../shared/components/Progress';

export const MyRideRequests = ({...props}) => {
    const {user} =useProfile();
    React.useEffect(() => {
        props.fetchMyRideRequestsDetails(user._id);
            //console.log(props.ridereqs);
          

        
    },[user._id])

    const renderRideRequestCard=()=>{
        if(props.ridereqs.length===0)
        {
            return <div style={{color:'red',fontSize:'32px', marginTop:'150px',marginLeft:'400px'}}> No Ride Request</div>
        }
            return props.ridereqs.map(ridereq=>
                {
              
                        return  <MyRideRequestCard  key={ridereq._id}  ridereq={ridereq} />
                      
                }
             ) }
    return (
        <div>
      {props.ridereqs===null ?  <Progress/>:renderRideRequestCard()}
      </div>
    )
}
const mapStateToProps = (state, ownProps) => {
    //console.log(state.ridereqs);
    return { 
        ridereqs: state.ridereqs
        
     
    };
};

export default connect(
    mapStateToProps,
    {fetchMyRideRequestsDetails}  
  )(MyRideRequests);