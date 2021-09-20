import React,{useEffect} from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import {fetchPaymentOfCommunity} from '../actions';
import { useProfile } from "../../context/profile.context";
import AdminPendingPaymentsTable from './AdminPendingPaymentsTable';
import { useCommunity } from '../../context/community.context';

export const AdminPendingPayments = ({...props}) => {
   //const {user} =useProfile();
   //const communityid=user.communities[0];
   const {community}=useCommunity();
   const communityid=community._id;
    useEffect(() => {
        props.fetchPaymentOfCommunity(communityid);
        
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
  
