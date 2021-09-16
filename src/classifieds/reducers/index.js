import { combineReducers } from 'redux';
import classifiedsReducer from './classifiedsReducer';
import commentsReducer from './commentsReducer';
import usersReducer from './usersReducer';
import {reducer as reduxFormReducer} from 'redux-form';

export default combineReducers({
  classifieds: classifiedsReducer,
  comments:commentsReducer,
  users: usersReducer,
  form:reduxFormReducer

});
