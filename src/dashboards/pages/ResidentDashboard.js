import React from 'react'
import { useProfile } from '../../context/profile.context'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import PollingSection  from '../components/PollingSection';
import GridItem from "../../shared/components/Grid/GridItem.js";
import GridContainer from "../../shared/components/Grid/GridContainer.js";
import { UserInfo } from '../components/UserInfo';
import  AnnouncementSection  from '../components/AnnouncementSection';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const dashboardstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const ResidentDashboard = () => {
  const {user}=useProfile();

   return (
    <>
     <Provider store={dashboardstore}>
      <UserInfo/>

 
  <GridContainer>
  <GridItem xs={12} sm={12} md={6}>
            <AnnouncementSection   />
        </GridItem>
  <GridItem xs={12} sm={12} md={6}>
            <PollingSection  userid={user._id} />
        </GridItem>
  </GridContainer>
  </Provider>
     </>
)
}

export default ResidentDashboard
