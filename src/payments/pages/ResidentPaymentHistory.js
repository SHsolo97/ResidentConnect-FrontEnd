import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'

import { useApartment } from '../../context/apartment.context';
import ResidentTransactionHistory from '../components/ResidentTransactionHistory';

import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const ResidentPaymentHistory = ({...props}) => {
    const {apartment}=useApartment();
    const apartmentid=apartment._id;
    //const apartmentid=user.apartments[0].apartmentid;
   
     return (
        
        <div>
            <PageHeader> Transactions History</PageHeader>
            <Provider store={paymentstore}>
            <ResidentTransactionHistory />
            </Provider>
        </div>
    )
}

  
