import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import {fetchPaymentHistoryOfCommunity} from '../actions';
import AdminTransactionHistoryTable from './AdminTransactionHistoryTable';
import { useCommunity } from '../../context/community.context';


export const AdminTransactionHistory = ({...props}) => {
  
    const {community}=useCommunity();
    const communityid=community._id;
    //const apartmentid=user.apartments[0].apartmentid;
     useEffect(() => {
         props.fetchPaymentHistoryOfCommunity(communityid);
         
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [communityid])
     return (
        
        <div>
         
         {props.payments.length===0 && <div> No Transactions </div>}
           {props.payments.length>0 && <AdminTransactionHistoryTable payments={props.payments}/> }
            
        </div>
    )
}
const mapStateToProps = state => {
    return { payments: state.payments
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentHistoryOfCommunity }
  )(AdminTransactionHistory);
  
