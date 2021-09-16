import React,{useEffect} from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import {fetchPaymentOfCommunity} from '../actions';
import { useProfile } from "../../context/profile.context";
import AdminPendingPaymentsTable from './AdminPendingPaymentsTable';

export const AdminPendingPayments = ({...props}) => {
   const {user} =useProfile();
   const communityid=user.communities[0];
    useEffect(() => {
        props.fetchPaymentOfCommunity(communityid);
        console.log(props.payments);
        
    }, [])
     return (
        <div>
            <SectionHeader>Pending Payments</SectionHeader>
            <AdminPendingPaymentsTable payments={props.payments}/>
        </div>
    )
}
const mapStateToProps = state => {
    return { payments: state.payments ,
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfCommunity }
  )(AdminPendingPayments);
  
