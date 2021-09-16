import React from 'react'
import CreatePaymentForm from '../components/CreatePaymentForm';
import { PageHeader } from '../../shared/components/PageHeader'
import CreatePayment from './CreatePayment'
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const InitiatePayment = ({...props}) => {
  

  
    return (
        <div>
            <PageHeader>Create Payment</PageHeader>
            <Provider store={paymentstore}>
                <CreatePayment/>
            </Provider>
        </div>
    )
}
