import React,{useEffect} from 'react'
import {TextField,Button} from '@material-ui/core';

import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import PrimaryButton from '../../shared/components/PrimaryButton';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import ClassifiedsList from './ClassifiedsList';
import { useProfile } from '../../context/profile.context';

const store = createStore(reducers, applyMiddleware(thunk));

export const Classifieds = () => {
    const history=useHistory();
    const {user}=useProfile();
    const communityid=user.communities[0];
    const goToClassified=()=>
    {
        history.push('/addclassified');
        //history.push('/samplePage');
    }
    return (
        <>
         <PageHeader>Classifieds</PageHeader>
         <PrimaryButton onClick={goToClassified}>Add Classified</PrimaryButton>
         <Provider store={store}>
             <ClassifiedsList communityid={communityid} />
         </Provider>
        </>
    )
}

