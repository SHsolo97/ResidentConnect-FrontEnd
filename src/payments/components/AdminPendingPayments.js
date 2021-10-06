/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import {fetchPaymentOfCommunity} from '../actions';
import AdminPendingPaymentsTable from './AdminPendingPaymentsTable';
import { useCommunity } from '../../context/community.context';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

export const AdminPendingPayments = ({...props}) => {
   //const {user} =useProfile();
   //const communityid=user.communities[0];
   const history=useHistory();
   const {community}=useCommunity();
   const communityid=community._id;
   const {fetchPaymentOfCommunity}=props;
    useEffect(() => {
        fetchPaymentOfCommunity(communityid);
        
    }, [communityid])
    const showTransactionHistory=()=>{
        history.push('/paymentHistoryA');
    }
     return (
        <div><Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        >
            <SectionHeader>Pending Payments</SectionHeader>
            <Button onClick={showTransactionHistory}>Transaction History</Button>
</Grid>
            <AdminPendingPaymentsTable payments={props.payments}/>
        </div>


    )
}
const mapStateToProps = state => {
    return { payments: state.payments.filter(payment=>payment.status!=='paid')  
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfCommunity }
  )(AdminPendingPayments);
  
