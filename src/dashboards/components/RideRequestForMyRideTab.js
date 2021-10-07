import React from 'react'



import { connect } from 'react-redux';
import {useProfile} from '../../context/profile.context';
import { fetchReceivedRideRequestsDetails } from '../actions';
import MyRideRequestTable from "../../shared/components/Table/MyRideRequestTable.js"



export const RideRequestForMyRideTab = ({...props}) => {
  const {user}=useProfile();

  React.useEffect(() => {

       props.fetchReceivedRideRequestsDetails(user._id);
   
    }, [user._id])

    const renderRideReqs=()=>{
        if(props.ridereqs==null)
           return;
        if(props.ridereqs.length===0)
        {
           return <div style={{marginLeft:'250px'}}> No Requests </div>
        }
        const ridereqs=props.ridereqs;
        return <MyRideRequestTable
                  tableHeaderColor="info"
                  tableHead={["Date","Source","Destination","Seats","Status","Action"]}
                  tableData={ridereqs}
                />
        
      }
    return (
   <div>
       {renderRideReqs()}
   </div>
  )
}

const mapStateToProps = state => {
    const today=new Date();
    return {
    ridereqs: state.ridereqs.filter(ridereq=>(new Date(ridereq.ride.ridedatetime)>=today) && ridereq.status==='pending' )
    
    };
  };
  
  export default connect(
  mapStateToProps,
  { fetchReceivedRideRequestsDetails }
  )(RideRequestForMyRideTab);