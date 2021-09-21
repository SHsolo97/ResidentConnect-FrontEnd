import { combineReducers } from 'redux';

import usersReducer from './usersReducer';
import {reducer as reduxFormReducer} from 'redux-form';
import apartmentReducer from './apartmentReducer';
import paymentsReducer from './paymentsReducer';

export default combineReducers({
  apartmentsSummary:apartmentReducer,
  userSummary: usersReducer,
  payments:paymentsReducer,
  form:reduxFormReducer

});
