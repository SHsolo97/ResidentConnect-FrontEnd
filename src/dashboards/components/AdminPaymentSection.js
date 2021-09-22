import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardIcon from "../../shared/components/cards/CardIcon.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import CardFooter from "../../shared/components/cards/CardFooter.js";
import {fetchPaymentOfCommunity} from '../actions';
import { makeStyles } from '@material-ui/core';
import {
    Chart,
    PieSeries,
  } from '@devexpress/dx-react-chart-material-ui';


const useStyles = makeStyles({
  piechart: {


    width: '300px',
    height: '300px'
   
  },
});


const AdminPaymentSection =({...props})=>{
    const classes=useStyles();

    React.useEffect(() => {
        console.log(props.communityid);
        props.fetchPaymentOfCommunity(props.communityid);

        console.log(props.totalPaid);
        console.log(props.totalDue);
        
    }, [])
    
    const renderPaymentData=()=>{
        const totalPaid=props.totalPaid!=null?parseInt(props.totalPaid):1300;
        const totalDue=props.totalDue!=null?parseInt(props.totalDue):1300;
        const chartData=[];
        chartData.push({status: 'TotalPaid', amount: totalPaid },
        { status: 'TotalDue', amount: totalDue })

        return (  <Chart className={classes.piechart} data={chartData}>
            <PieSeries  valueField="amount" argumentField="status"/>
          </Chart>);

    }

    return(
        <Card>
        <CardHeader color="rose">
          <h2 className={classes.cardTitleWhite}>Payments</h2>
        </CardHeader>
        <CardBody>
         {renderPaymentData()}
        </CardBody>
      </Card>
    )

}
const mapStateToProps = state => {


    return { 

             totalPaid : state.payments.reduce(function (accumulator, payment) {
                if(payment.status==='paid')
                    return accumulator + payment.amt;
              }, 0),
            
              totalDue : state.payments.reduce(function (accumulator, payment) {
                if(payment.status!=='paid')
                    return accumulator + payment.amt;
              }, 0)
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfCommunity }
  )(AdminPaymentSection);
  