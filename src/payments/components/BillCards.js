import React from 'react'
import Box from '@material-ui/core/Box';
import { Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {fetchPaymentOfApartment} from '../actions';
import { useApartment } from '../../context/apartment.context';
const useStyles = makeStyles((theme) => ({
    lastpaymentInner: {
        background:'#FFEAB3',
        borderRadius: '5%',
        borderColor: 'gray',
        width: '15rem',
         height: '8rem'
    },
    lastpaymentOuter: {
        background:'#F8C541',
        borderRadius: '5%',
        borderColor: 'gray',
        width: '0.5rem',
         height: '8rem'
    },
    overdueInner: {
        background:'#FFBBAB',
        borderRadius: '5%',
        borderColor: 'gray',
        width: '15rem',
         height: '8rem'
    },
    overdueOuter: {
        background:'#FE7456',
        borderRadius: '5%',
        borderColor: 'gray',
        width: '0.5rem',
         height: '8rem'
    },
    billdueInner: {
        background:'#B8EAB7',
        borderRadius: '5%',
        borderColor: 'gray',
        width: '15rem',
         height: '8rem'
    },
    billdueOuter: {
        background:'#5CE459',
        borderRadius: '5%',
        borderColor: 'gray',
        width: '0.5rem',
         height: '8rem'
    },
    cardHeading:{
        marginTop:'10px',
         color:'grey',
         fontWeight:'bold',
        padding:'5px',
         marginLeft:'20px',
         fontSize:'14px',
         width:'110px'
    },
    cardAmount:{
        marginTop:'10px',
         color:'grey',
        padding:'5px',
         marginLeft:'20px',
         fontSize:'18px',
         width:'100px'
    },
    cardLink:{
        color:'grey',
        padding:'5px',
         marginLeft:'20px',
         fontSize:'14px',
         width:'100px'
    }
  
}));

export const BillCards = ({...props}) => {
    const classes = useStyles();
    const {apartment}=useApartment();
    const apartmentid=apartment._id;
    const totalDue=props.totalDue==null?0:props.totalDue.toLocaleString('en-IN')
    const totalOverdue=props.totalOverdue==null?0:props.totalOverdue.toLocaleString('en-IN')
    React.useEffect(() => {
        props.fetchPaymentOfApartment(apartmentid);
       
    },[])
       return (
    <div style={{paddingTop:"50px", paddingBottom:"50px"}} >
    <Grid  container
    direction="row"
    justifyContent="space-evenly"
    alignItems="flex-start" spacing={2}>
   
      <Box   className={classes.billdueInner} >
      <Box   className={classes.billdueOuter}>
        <Grid  container
  direction="column"
  justifyContent="center"
  alignItems="center"  style={{width:"50px"}}
>
    <div className={classes.cardHeading}> Bill Due</div>
    <div className={classes.cardAmount}> &#8377; {totalDue}</div>
    <a href="#" className={classes.cardLink} >Pay Now</a>
        </Grid>
      </Box>
      </Box>
      <Box   className={classes.overdueInner}>
      <Box   className={classes.overdueOuter}>
        <Grid  container
  direction="column"
  justifyContent="center"
  alignItems="center"  style={{width:"50px"}}
>
    <div className={classes.cardHeading}> Over Due</div>
    <div className={classes.cardAmount} > &#8377; {totalOverdue}</div>
    <a href="#" className={classes.cardLink} >Pay Now</a>
        </Grid>
      </Box>
      </Box>

      <Box   className={classes.lastpaymentInner} >
      <Box   className={classes.lastpaymentOuter}>
        <Grid  container
  direction="column"
  justifyContent="center"
  alignItems="center"  style={{width:"50px"}}
>
    <div className={classes.cardHeading}> Last Payment</div>
    <div className={classes.cardAmount} >5000</div>
    <a href="#" className={classes.cardLink} >View</a>
        </Grid>
      </Box>
      </Box>
    </Grid>

    </div>
  );
    
}
const mapStateToProps = state => {
    return {     totalOverdue :  state.payments.filter(payment=>payment.status==='overdue').reduce(function (accumulator, payment) {
        if(payment.status==='overdue')
            return accumulator + payment.amt;
      }, 0),
      totalDue :  state.payments.filter(payment=>payment.status==='due').reduce(function (accumulator, payment) {
        if(payment.status==='due')
            return accumulator + payment.amt;
      }, 0)
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfApartment }
  )(BillCards);
  