import React,{useEffect} from 'react'
import {fetchMyRides} from '../actions/index';
import { connect } from 'react-redux';
import { useProfile } from '../../context/profile.context';
import {MyRideHistoryCard} from './MyRideHistoryCard';

export const MyRideHistory = ({...props}) => {
    const {user}=useProfile();
    const [rides,setRides]=React.useState([]);
    useEffect(() => {
        props.fetchMyRides(user._id);
        console.log(props.rides);
        const temprides=[];
        if(props.rides!=null)
        {
            props.rides.map(ride=>{
                temprides.push(ride);
            })
            console.log(temprides);
            setRides(temprides);

        };
    },[])
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
    return { rides: state.rides.filter(ride=>ride.status!='active')};

  };
  
  export default connect(
    mapStateToProps,
    { fetchMyRides}
  
  )(MyRideHistory);