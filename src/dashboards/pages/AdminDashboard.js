import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';
import UnitsAndUserSection from '../components/UnitsAndUserSection';
import {HelpDeskSection} from '../components/HelpDeskSection';
import {FacilityActivitySection} from '../components/FacilityActivitySection';


import Grid from '@mui/material/Grid';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import AdminPaymentSection from '../components/AdminPaymentSection';
import { ChatSection } from '../components/ChatSection';
import { PollingSection } from '../components/PollingSection';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const dashboardstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const AdminDashboard = () => {
const {community}=useCommunity();
const communityid=community._id;
return (

<>
  <PageHeader>Admin Dashboard</PageHeader>
  <Provider store={dashboardstore}>
    <Grid container direction="column" spacings={1} justifyContent="space-around" alignItems="center">
    <Grid container direction="row" justifyContent="space-around" alignItems="center">

          <UnitsAndUserSection communityid={communityid} />
          <HelpDeskSection />
            
      </Grid>
      <br/>
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
      <AdminPaymentSection communityid={communityid} />
        <FacilityActivitySection />
      </Grid>
      <br/>
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <ChatSection />
          <PollingSection communityid={communityid} />
      </Grid>
    </Grid>
  </Provider>
</>
)
}

export default AdminDashboard