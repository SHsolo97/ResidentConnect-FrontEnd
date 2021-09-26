import React from 'react'
import { useModelState } from '../../misc/custom-hooks';
import {PrimaryButton}from '../../shared/components/PrimaryButton'
import  CreatePolling  from './CreatePolling'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import PollingOverview from '../components/PollingOverview';
import { useProfile } from '../../context/profile.context';
import { Grid } from '@material-ui/core';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pollingStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const Pollings = () => {
    const { isOpen, open, close } = useModelState();

    const {user}=useProfile();
    return (
        <div>
           <Grid container style={{marginBottom:'50px'}} direction="row" justifyContent="space-between" alignItems="center">
                 <h1> Pollings </h1>
                 <PrimaryButton onClick={open}>Create Polling</PrimaryButton>
            </Grid>
            <Provider store={pollingStore}>

            {isOpen && <CreatePolling   handleClose={close} open={open} />}
                <PollingOverview userid={user._id}/>
               
            </Provider>
        </div>
    )
}

export default Pollings
