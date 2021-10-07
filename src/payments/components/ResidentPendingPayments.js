import React,{useEffect} from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { connect } from 'react-redux';
import {fetchPaymentOfApartment} from '../actions';
import ResidentPendingPaymentsTable from './ResidentPendingPaymentsTable';
import { useApartment } from '../../context/apartment.context';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export const ResidentPendingPayments = ({...props}) => {
   const {apartment}=useApartment();
   const apartmentid=apartment._id;
   const history=useHistory();
   //const apartmentid=user.apartments[0].apartmentid;
    useEffect(() => {
        props.fetchPaymentOfApartment(apartmentid);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apartmentid])
    const showTransactionHistory=()=>{
        history.push('/paymentHistoryR');
    }
     return (
        <div>
            <Grid
  container
  direction="row"
  justifyContent="space-between"
  alignItems="center"
>
            <SectionHeader>Pending Payments</SectionHeader>
            <Button onClick={showTransactionHistory}>Transaction History</Button>
            </Grid>
            <ResidentPendingPaymentsTable payments={props.payments}/>
        </div>
    )
}
const mapStateToProps = state => {
    //console.log(state.payments);
    return { payments: state.payments.filter(payment=>payment.status!=='paid')  
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentOfApartment }
  )(ResidentPendingPayments);
  
