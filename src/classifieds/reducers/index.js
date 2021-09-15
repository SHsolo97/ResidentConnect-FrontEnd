import { combineReducers } from 'redux';
import classifiedsReducer from './classifiedsReducer';
import commentsReducer from './commentsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  classifieds: classifiedsReducer,
  comments:commentsReducer,
  users: usersReducer

});
