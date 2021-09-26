import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import MyRideHistory from  '../components/MyRideHistory';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const carPoolingStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export const RideHistory = () => {
    return (
        <div>
            <PageHeader> Ride History</PageHeader>
            <Provider store={carPoolingStore}>
                    <MyRideHistory/>
            </Provider>
        </div>
    )
}
