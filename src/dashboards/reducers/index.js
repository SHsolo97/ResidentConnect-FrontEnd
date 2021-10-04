import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import {reducer as reduxFormReducer} from 'redux-form';
import apartmentReducer from './apartmentReducer';
import paymentsReducer from './paymentsReducer';
import pollsReducer from './pollsReducer';
import announcementsReducer from './announcementsReducer';
import usersSummaryReducer from './usersSummaryReducer';
import rideReqReducer from './rideReqReducer';

export default combineReducers({
  announcements:announcementsReducer,
  apartmentsSummary:apartmentReducer,
  userSummary: usersSummaryReducer,
  users:usersReducer,
  payments:paymentsReducer,
  polls:pollsReducer,
  ridereqs:rideReqReducer,
  form:reduxFormReducer

});
