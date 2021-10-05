import React from 'react'
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import  CardPaymentForm  from './CardPaymentForm';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const paymentstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const PayBillByCard = ({...props}) => {
    
    return (
        <div>
            <Provider store={paymentstore}>
                <CardPaymentForm bill={props.bill}/>
                </Provider>
        </div>
    )
}
