import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router-dom'
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import ClassifiedsList from './ClassifiedsList';
import { ClassifiedSearch } from '../components/ClassifiedSearch';
import { connect } from 'react-redux';
import { fetchClassifieds } from '../actions';
import { useCommunity } from '../../context/community.context';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const Classifieds = () => {
   
    const history=useHistory();
    const {community}=useCommunity();
    console.log(community);
    const communityid=community._id;
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
