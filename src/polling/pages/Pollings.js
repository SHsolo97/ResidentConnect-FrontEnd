import React from 'react'
import { useModelState } from '../../misc/custom-hooks';
import PrimaryButton from '../../shared/components/PrimaryButton'
import  CreatePolling  from './CreatePolling'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import PollingOverview from '../components/PollingOverview';
import { useProfile } from '../../context/profile.context';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const pollingStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const Pollings = () => {
    const { isOpen, open, close } = useModelState();
    const {user}=useProfile();
    return (
        <div>
            <h1> Pollings </h1>
            <Provider store={pollingStore}>

                <PrimaryButton onClick={open}>Create Polling</PrimaryButton>
            {isOpen && <CreatePolling   handleClose={close} open={open} />}
                <PollingOverview userid={user._id}/>
               
            </Provider>
        </div>
    )
}

export default Pollings
