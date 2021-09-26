import React,{useEffect} from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import {fetchPaymentOfApartment} from '../actions';
import ResidentPendingPaymentsTable from './ResidentPendingPaymentsTable';
import { useApartment } from '../../context/apartment.context';

export const ResidentPendingPayments = ({...props}) => {
   const {apartment}=useApartment();
   const apartmentid=apartment._id;
   //const apartmentid=user.apartments[0].apartmentid;
    useEffect(() => {
        props.fetchPaymentOfApartment(apartmentid);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apartmentid])
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
  
