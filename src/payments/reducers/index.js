import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import {reducer as reduxFormReducer} from 'redux-form';
import apartmentReducer from './apartmentReducer';
import paymentsReducer from './paymentsReducer';
import residentsReducer from './residentsReducer';
import communityReducer from './communityReducer';

export default combineReducers({
  apartments:apartmentReducer,
  payments:paymentsReducer,
  residents:residentsReducer,
  users: usersReducer,
  community:communityReducer,
  form:reduxFormReducer

});
