import React from 'react'
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import styles from "../styles/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import ApartmentIcon from '@mui/icons-material/Apartment';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import {useProfile} from '../../context/profile.context';
import { fetchReceivedRideRequestsDetails } from '../actions';
import MyRideRequestTable from "../../shared/components/Table/MyRideRequestTable.js"

const useStyles = makeStyles(styles);

export const RideRequestForMyRideTab = ({...props}) => {
  const classes = useStyles();
  const {user}=useProfile();

  React.useEffect(() => {

       props.fetchReceivedRideRequestsDetails(user._id);
   
    

    console.log(props.ridereqs);
    }, [])

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