import React,{useEffect} from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import {fetchPaymentOfApartment} from '../actions';
import { useProfile } from "../../context/profile.context";
import ResidentPendingPaymentsTable from './ResidentPendingPaymentsTable';

export const ResidentPendingPayments = ({...props}) => {
   const {user} =useProfile();
   const apartmentid=user.apartments[0].apartmentid;
    useEffect(() => {
        props.fetchPaymentOfApartment(apartmentid);
        console.log(props.payments);
        
    }, [])
     return (
        <div>
            <SectionHeader>Pending Payments</SectionHeader>
            <ResidentPendingPaymentsTable payments={props.payments}/>
        </div>
    )
}
const mapStateToProps = state => {
    return { payments: state.payments ,
      
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfApartment }
  )(ResidentPendingPayments);
  
