import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import BillCircles from '../components/BillCircles';
import PaymentGraph from './PaymentGraph';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import {fetchPaymentOfCommunity} from '../actions';
import {useCommunity} from '../../context/community.context';

export const AdminPaymentsOverview = ({...props}) => {
    const {community}=useCommunity();
    const communityid= community._id;
    console.log(communityid);
    React.useEffect(() => {
        props.fetchPaymentOfCommunity(communityid);
       
    },[])
        return (
        <div>
            <Grid container spacing={3}>
      <Grid item xs={9}>
                 <PaymentGraph  />
                 </Grid>
                 <Grid item xs={3}>   
            <BillCircles totalPaid={props.totalPaid} totalDue={props.totalDue} totalOverdue={props.totalOverdue} />
            </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = state => {
    return { 
        payments:state.payments,
        transactions_paid: state.payments.filter(payment=>payment.status==='paid'),
             transctions_due: state.payments.filter(payment=>payment.status==='due'),
             transactions_overdue: state.payments.filter(payment=>payment.status==='overdue'),
             totalPaid : state.payments.reduce(function (accumulator, payment) {
                if(payment.status==='paid')
                    return accumulator + payment.amt;
              }, 0),
              totalOverdue : state.payments.reduce(function (accumulator, payment) {
                if(payment.status==='overdue')
                    return accumulator + payment.amt;
              }, 0),
              totalDue : state.payments.reduce(function (accumulator, payment) {
                if(payment.status==='due')
                    return accumulator + payment.amt;
              }, 0)
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfCommunity }
  )(AdminPaymentsOverview);
  