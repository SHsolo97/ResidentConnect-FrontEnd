import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {fetchPaymentOfCommunity} from '../actions';
import { makeStyles } from '@material-ui/core';
import {
    Chart,
    PieSeries,
  } from '@devexpress/dx-react-chart-material-ui';


const useStyles = makeStyles({
  piechart: {
    marginTop:'-65px',
    marginLeft:'95px',

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
        <Paper elevation={3} style={{width:'600px',height:'400px'}}>
        <SectionHeader> Payments</SectionHeader>
        {renderPaymentData()}
        </Paper>
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
  