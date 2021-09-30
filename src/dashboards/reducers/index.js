import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import {reducer as reduxFormReducer} from 'redux-form';
import apartmentReducer from './apartmentReducer';
import paymentsReducer from './paymentsReducer';
import pollsReducer from './pollsReducer';
import announcementsReducer from './announcementsReducer';

export default combineReducers({
  announcements:announcementsReducer,
  apartmentsSummary:apartmentReducer,
  userSummary: usersReducer,
  payments:paymentsReducer,
  polls:pollsReducer,
  form:reduxFormReducer

});
