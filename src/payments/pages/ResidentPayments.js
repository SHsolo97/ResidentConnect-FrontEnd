import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import ResidentPendingPayments  from '../components/ResidentPendingPayments';

import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const ResidentPayments = () => {
    return (
        <div>
            <PageHeader>Payments Overview</PageHeader>
            <Provider store={paymentstore}>
            <ResidentPendingPayments/>
            </Provider>
        </div>
    )
}

export default ResidentPayments
