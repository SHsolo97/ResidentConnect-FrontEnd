import React from 'react'
import {PrimaryButton}from '../../shared/components/PrimaryButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import  RideRequests  from '../components/RideRequests';
import MyRideRequests  from '../components/MyRideRequests';
import  MyRides  from '../components/MyRides';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const carPoolingStore1 = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const carPoolingStore2 = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
const carPoolingStore3 = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

function TabPanel(props) {
const { children, value, index, ...other } = props;

return (
<div role="tabpanel" hidden={value !==index} {...other}>
  {value === index && (

  <Typography>{children}</Typography>

  )}
</div>
);
}
TabPanel.propTypes = {
children: PropTypes.node,
index: PropTypes.any.isRequired,
value: PropTypes.any.isRequired,
};

const CarPooling = () => {
const [value, setValue] = React.useState(0);
const history=useHistory();
const goToCreateRidePage=()=>{
history.push('/createRide');

}
const goToSearchRidePage=()=>{
history.push('/searchRide');

}
const goToRideHistoryPage=()=>{
history.push('/rideHistory');
}

const handleChange = (event, newValue) => {
setValue(newValue);
};
return (
<div>
<Grid container direction="row" justifyContent="space-between" alignItems="center">

  <PageHeader> Car Pooling </PageHeader>
  <Grid  items alignItems="flex-start">

  <PrimaryButton  style={{marginLeft:'10px'}} onClick={goToCreateRidePage}> Create Ride </PrimaryButton>
  <PrimaryButton style={{marginLeft:'10px'}}   onClick={goToSearchRidePage}> Search Ride </PrimaryButton>
  <PrimaryButton style={{marginLeft:'10px'}}   onClick={goToRideHistoryPage}> Ride History </PrimaryButton>
  </Grid>
  </Grid>
  <div>
   
      <div position="static" color="default">

        <Tabs  textColor="primary"
        indicatorColor="primary" value={value} onChange={handleChange}>
          <Tab label="Ride Requests" id="ridereq" />
          <Tab label="My Ride Request" id="myridereq" />
          <Tab label="My Rides" id="myrides" />

        </Tabs>
      </div>
      <Provider store={carPoolingStore1}>

      <TabPanel id="ridereq" value={value} index={0}>
        <RideRequests />
      </TabPanel>
      </Provider>
     

      <TabPanel id="myridereq" value={value} index={1}>
      <Provider store={carPoolingStore2}>
        <MyRideRequests />
        </Provider>

      </TabPanel>
 
       <TabPanel id="myrides" value={value} index={2}>
       <Provider store={carPoolingStore3}>

        <MyRides />
        </Provider>
      </TabPanel>
     


  </div>
  
</div>
)
}

export default CarPooling