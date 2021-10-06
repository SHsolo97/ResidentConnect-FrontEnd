import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import SearchRideForm from '../components/SearchRideForm';
import  RideResult  from '../components/RideResult';
import Grid from '@mui/material/Grid';

import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const carpollStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const SearchRide = ({...props}) => {

    const[filter,setFilter]=React.useState({});
    const setQuery=(data)=>{
        setFilter(data)
    }

    return (
        <div>
            <PageHeader> Search Ride</PageHeader>
            <Provider store={carpollStore}>
             <SearchRideForm  onSubmit={setQuery} />
            <RideResult filter={filter}/>
            </Provider>
        </div>
    )
}
