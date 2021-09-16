import React,{useEffect} from 'react'
import {TextField,Button} from '@material-ui/core';

import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {useModelState} from '../../misc/custom-hooks';

import PrimaryButton from '../../shared/components/PrimaryButton';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import reducers from '../reducers';
import ClassifiedsList from './ClassifiedsList';
import { useProfile } from '../../context/profile.context';
import { ClassifiedSearch } from '../components/ClassifiedSearch';
import { connect } from 'react-redux';
import { fetchClassifieds } from '../actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const Classifieds = () => {
    const { isOpen, open, close } = useModelState();
   
    const history=useHistory();
    const {user}=useProfile();
    const communityid=user.communities[0];
    const [searchQuery,setSearchQuery]=React.useState({communityid});
    const goToClassified=()=>
    {
        history.push('/addclassified');
        //history.push('/samplePage');
    }
    const setSearchData=(data)=>{
        console.log(data);
        setSearchQuery(data);
    }
    return (
        <>
         <PageHeader>Classifieds</PageHeader>
         <PrimaryButton onClick={goToClassified}>Add Classified</PrimaryButton>
         <Provider store={store}>
             <ClassifiedSearch setSearchData={setSearchData}/>
             <ClassifiedsList searchData={searchQuery} />
         </Provider>
        </>
    )
}
const mapStateToProps = state => {
    return { classifieds: state.classifieds };
  };
  
  export default connect(
    mapStateToProps,
    { fetchClassifieds }
  )(ClassifiedsList);
