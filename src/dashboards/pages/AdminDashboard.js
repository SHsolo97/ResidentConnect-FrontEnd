import React from 'react'
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context'
import { PageHeader } from '../../shared/components/PageHeader';
import UnitsAndUserSection from '../components/UnitsAndUserSection';
import {HelpDeskSection} from '../components/HelpDeskSection';
import {FacilityActivitySection} from '../components/FacilityActivitySection';
import { makeStyles } from "@material-ui/core/styles";

import ChartistGraph from "react-chartist";
import Table from "../../shared/components/Table/Table.js"
import Grid from '@mui/material/Grid';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import AccessTime from "@material-ui/icons/AccessTime";

import { createStore, applyMiddleware, compose } from 'redux';
import AdminPaymentSection from '../components/AdminPaymentSection';
import { ChatSection } from '../components/ChatSection';
import PollingSection  from '../components/PollingSection';
import GridItem from "../../shared/components/Grid/GridItem.js";
import GridContainer from "../../shared/components/Grid/GridContainer.js";
import Card from "../../shared/components/cards/Card.js";
import CardHeader from "../../shared/components/cards/CardHeader.js";
import CardIcon from "../../shared/components/cards/CardIcon.js";
import CardBody from "../../shared/components/cards/CardBody.js";
import CardFooter from "../../shared/components/cards/CardFooter.js";
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
  } from "../../data/charts.js";
import styles from "../styles/dashboardStyle.js";
const useStyles = makeStyles(styles);




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const dashboardstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));


const AdminDashboard = () => {
  const classes = useStyles();
const {user}=useProfile();
const {community}=useCommunity();
const communityid=community._id;

return (

<>
  <PageHeader>Admin Dashboard</PageHeader>
  <Provider store={dashboardstore}>
  

 
  <GridContainer>
  <GridItem xs={12} sm={12} md={6}>
  <UnitsAndUserSection communityid={communityid} />

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
  <HelpDeskSection communityid={communityid} />

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
  <FacilityActivitySection communityid={communityid} />

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
  <AdminPaymentSection communityid={communityid} />

      </GridItem>
      
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <PollingSection userid={user._id} communityid={communityid} />
        </GridItem>
        </GridContainer>
        </Provider>
</>
)
}

export default AdminDashboard