import React from 'react'
import { useHistory } from 'react-router-dom';

import { PageHeader } from '../../shared/components/PageHeader';
import PrimaryButton from '../../shared/components/PrimaryButton';
import AdminPendingPayments from '../components/AdminPendingPayments';
import { AdminPaymentsOverview } from '../components/AdminPaymentsOverview';
import CreatePayment from './CreatePayment'
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Grid from '@mui/material/Grid';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const AdminPayments = () => {

const history=useHistory();

const gotoPaymentPage=()=>{
history.push('/initiatePayment');
}

return (
<div>
  <Grid container direction="row" justifyContent="space-between" alignItems="center">
    <PageHeader>Payments Overview</PageHeader>
    <PrimaryButton onClick={gotoPaymentPage}> Initiate Payment</PrimaryButton>
  </Grid>
  <Provider store={paymentstore}>
    <AdminPaymentsOverview />
    <AdminPendingPayments />
  </Provider>
</div>
)

}

export default AdminPayments