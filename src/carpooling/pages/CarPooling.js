import React from 'react'
import PrimaryButton from '../../shared/components/PrimaryButton'
import { PageHeader } from '../../shared/components/PageHeader'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import  RideRequests  from '../components/RideRequests';
import MyRideRequests  from '../components/MyRideRequests';
import  MyRides  from '../components/MyRides';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const carPoolingStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

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
  <PageHeader> Car Pooling </PageHeader>
  <PrimaryButton onClick={goToCreateRidePage}> Create Ride </PrimaryButton>
  <PrimaryButton onClick={goToSearchRidePage}> Search Ride </PrimaryButton>
  <PrimaryButton onClick={goToRideHistoryPage}> Ride History </PrimaryButton>
  <Provider store={carPoolingStore}>
  <div>
   
      <div position="static" color="default">

        <Tabs value={value} onChange={handleChange}>
          <Tab label="Ride Requests" id="ridereq" />
          <Tab label="My Ride Request" id="myridereq" />
          <Tab label="My Rides" id="myrides" />

        </Tabs>
      </div>
      <TabPanel id="ridereq" value={value} index={0}>
        <RideRequests />
      </TabPanel>
      <TabPanel id="myridereq" value={value} index={1}>

        <MyRideRequests />

      </TabPanel>
       <TabPanel id="myrides" value={value} index={2}>

        <MyRides />

      </TabPanel>

  </div>
  </Provider>
</div>
)
}

export default CarPooling