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
        console.log(props.totalPaid);
        console.log(props.totalDue);
        console.log(props.totalOverdue);

       
    },[])
        return (
        <div>
            <Grid container spacing={3}>
      <Grid item xs={9}>
                 {props.payments!=null && <PaymentGraph  />}
                 </Grid>
                 <Grid item xs={3}>   
                 {props.payments!=null && <BillCircles totalPaid={props.totalPaid} totalDue={props.totalDue} 
                 totalOverdue={props.totalOverdue} />}
            </Grid>
            </Grid>
        </div>
    )
}
const mapStateToProps = state => {
    let totalPaid=0;
    let totalOverdue=0;
    let totalDue=0;
    return { 
        payments:state.payments,
        transactions_paid: state.payments.filter(payment=>payment.status==='paid'),
             transctions_due: state.payments.filter(payment=>payment.status==='due'),
             transactions_overdue: state.payments.filter(payment=>payment.status==='overdue'),
             totalPaid : state.payments.filter(payment=>payment.status==='paid').reduce(function (a1, payment) {
                
                    return a1 + payment.amt;
              }, 0),
              totalOverdue : state.payments.filter(payment=>payment.status==='overdue').reduce(function (a2, payment) {
                
                    return a2 + payment.amt;
              }, 0),
              totalDue : state.payments.filter(payment=>payment.status==='due').reduce(function (a3, payment) {
               
                    return a3 + payment.amt;
              }, 0)
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfCommunity }
  )(AdminPaymentsOverview);
  