import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { orange } from '@material-ui/core/colors'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Button} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BookingList} from '../components/BookingList';
import { FacilitySearch } from '../components/FacilitySearch';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const facilitystore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const AdminFacility = () => {
    const history=useHistory();
    const goToAddFacility=()=>{
        history.push('/addFacility');
    }
    return (
        <>
           <PageHeader> Facility Overview </PageHeader>
           <Button
        variant="contained"
        style ={{backgroundColor: orange[500] }}
        startIcon={<AddCircleOutlineIcon />} onClick={goToAddFacility}>Add Facility</Button>
        <FacilitySearch/>
        <Provider store={facilitystore}>
        <BookingList/>
        </Provider>
        </>
    )
}

export default AdminFacility
