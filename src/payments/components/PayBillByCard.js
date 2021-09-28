import React from 'react'
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import  CardPaymentForm  from './CardPaymentForm';
import { CardElement,useElement,useStripe } from "react-stripe-elements";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const PayBillByCard = () => {
    
    return (
        <div>
            <Provider store={paymentstore}>
                <CardPaymentForm/>
                </Provider>
        </div>
    )
}
