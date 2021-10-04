import React from 'react'
import { connect } from 'react-redux';
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import {fetchPaymentOfCommunity} from '../actions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';

import { Button, makeStyles } from '@material-ui/core';
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
    const[totalPaid,setTotalPaid]=React.useState(0);
    const[totalDue,setTotalDue]=React.useState(0);
    const[total,setTotal]=React.useState(0);
    const history=useHistory();
    React.useEffect(() => {
        //console.log(props.communityid);
        props.fetchPaymentOfCommunity(props.communityid);
        setTotalPaid(props.totalPaid!=null?parseInt(props.totalPaid):0);
        setTotalDue(props.totalDue!=null?parseInt(props.totalDue):0);
        setTotal((props.totalDue!=null?parseInt(props.totalDue):0) + (props.totalPaid!=null?parseInt(props.totalPaid):0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const goToPayments=()=>{
      history.push('/paymentA');
    }
    const renderPaymentData=()=>{
       
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
        <Grid container >
        <Grid item xs={7}>
        {renderPaymentData()}
        </Grid>
        <Grid container   direction="column"
  justifyContent="center"
  alignItems="flex-start" xs={5}>
          
          <Typography variant='body1'>Total Due:   &#8377;{total.toLocaleString('en-IN')}</Typography>
          <Typography variant='body1'>Paid:  &#8377; {totalPaid.toLocaleString('en-IN')}</Typography>
          <Typography  variant='body1'>Due:   &#8377; {totalDue.toLocaleString('en-IN')}</Typography>
          <Button style={{color:'blue'}} onClick={goToPayments}> More Details...</Button>
        </Grid>
       </Grid>
        </CardBody>
      </Card>
    )

}
const mapStateToProps = state => {

    console.log(state.payments);
    return { 

             totalPaid : state.payments.filter(payment=>payment.status==='paid').reduce(function (accumulator1, payment) {
               
                    return accumulator1 + payment.amt;
                 
              }, 0),
            
              totalDue : state.payments.filter(payment=>payment.status!=='paid').reduce(function (accumulator2, payment) {
        
                    return accumulator2 + payment.amt;
              
              }, 0)
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfCommunity }
  )(AdminPaymentSection);
  