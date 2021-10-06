import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import UnitsAndUserSection from '../components/UnitsAndUserSection';
import {AdminHelpDeskSection} from '../components/AdminHelpDeskSection';
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
const renderData=()=>{

  if(user===null || community==null )
  {
    return (null);
  }
  const communityid=community._id;

  const {facility,maintenance,polling}=community.paidservices;

  return(
  <Provider store={dashboardstore}>
    

    <UserInfo/>
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <UnitsAndUserSection communityid={communityid} />

      </GridItem>
      {maintenance && <GridItem xs={12} sm={12} md={6}>
        <AdminHelpDeskSection communityid={communityid} />

      </GridItem>}
      <GridItem xs={12} sm={12} md={6}>
        <AnnouncementSection communityid={communityid} />
      </GridItem>
      {polling && <GridItem xs={12} sm={12} md={6}>
        <PollingSection userid={user._id}  />
      </GridItem> }
      {facility && <GridItem xs={12} sm={12} md={6}>
        <FacilityActivitySection communityid={communityid} />

      </GridItem>}
     <GridItem xs={12} sm={12} md={6}>
        <AdminPaymentSection communityid={communityid} />

      </GridItem> 

      
    </GridContainer>
  </Provider>)
}
return (

<>
  {renderData()}
</>
)
}

export default AdminDashboard