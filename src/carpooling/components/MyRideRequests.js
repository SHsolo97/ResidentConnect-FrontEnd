import React from 'react'
import { connect } from 'react-redux';
import { useProfile } from '../../context/profile.context';
import {fetchRideRequestsByRequester} from '../actions/index';
import MyRideRequestCard from './MyRideRequestCard';

export const MyRideRequests = ({...props}) => {
    const {user} =useProfile();
    React.useEffect(() => {
        props.fetchRideRequestsByRequester(user._id);
        
    },[])

    const renderRideRequestCard=()=>{
            return props.ridereqs.map(ridereq=>
                {
              
                        return  <MyRideRequestCard ridereq={ridereq} />
                      
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
        ridereqs: state.ridereqs
        
    };
};

export default connect(
    mapStateToProps,
    {fetchRideRequestsByRequester}  
  )(MyRideRequests);