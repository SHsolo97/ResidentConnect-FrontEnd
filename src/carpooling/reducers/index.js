import { combineReducers } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import ridesReducer from './ridesReducer';
import rideReqReducer from './rideReqReducer';
import usersReducer from './usersReducer';


export default combineReducers({
 rides:ridesReducer,
 users: usersReducer,
 ridereqs:rideReqReducer,
  form:reduxFormReducer,
 


});
