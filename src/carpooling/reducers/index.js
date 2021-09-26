import { combineReducers } from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import ridesReducer from './ridesReducer';
import rideReqReducer from './rideReqReducer';
import usersReducer from './usersReducer';
import rideReducer from './rideReducer';


export default combineReducers({
 rides:ridesReducer,
 ride:rideReducer,
 ridereqs:rideReqReducer,
  form:reduxFormReducer,
  users: usersReducer,


});
