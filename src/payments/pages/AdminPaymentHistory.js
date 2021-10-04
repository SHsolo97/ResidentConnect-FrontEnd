import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'

import { useApartment } from '../../context/apartment.context';
import AdminTransactionHistory from '../components/AdminTransactionHistory';

import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const AdminPaymentHistory = ({...props}) => {
   
   
     return (
        
        <div>
            <PageHeader> Transactions History</PageHeader>
            <Provider store={paymentstore}>
            <AdminTransactionHistory />
            </Provider>
        </div>
    )
}

  
