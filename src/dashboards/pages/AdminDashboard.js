import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import UnitsAndUserSection from '../components/UnitsAndUserSection';
import {HelpDeskSection} from '../components/HelpDeskSection';
import {FacilityActivitySection} from '../components/FacilityActivitySection';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {UserInfo} from '../components/UserInfo';
import { createStore, applyMiddleware, compose } from 'redux';
import AdminPaymentSection from '../components/AdminPaymentSection';
import PollingSection from '../components/PollingSection';
import GridItem from "../../shared/components/Grid/GridItem.js";
import GridContainer from "../../shared/components/Grid/GridContainer.js";
import  AnnouncementSection from '../components/AnnouncementSection';





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const dashboardstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


const AdminDashboard = () => {

const {user}=useProfile();
const {community}=useCommunity();
const communityid=community._id;

return (

<>
  <Provider store={dashboardstore}>
    

    <UserInfo/>
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <UnitsAndUserSection communityid={communityid} />

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <HelpDeskSection communityid={communityid} />

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <AnnouncementSection communityid={communityid} />
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <PollingSection userid={user._id}  />
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <FacilityActivitySection communityid={communityid} />

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <AdminPaymentSection communityid={communityid} />

      </GridItem>

      
    </GridContainer>
  </Provider>
</>
)
}

export default AdminDashboard