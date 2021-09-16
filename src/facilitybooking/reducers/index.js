import { combineReducers } from 'redux';
import facilitiesReducer from './facilitiesReducer';
import facilityBookingReducer from './facilityBookingReducer';
import facilityTypesReducer from './facilityTypesReducer';

import usersReducer from './usersReducer';
import {reducer as reduxFormReducer} from 'redux-form';

export default combineReducers({
    facilityTypes: facilityTypesReducer,

  facilities: facilitiesReducer,
  bookings:facilityBookingReducer,
  users: usersReducer,
  form:reduxFormReducer

});
