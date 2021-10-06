import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

import {reducer as reduxFormReducer} from 'redux-form';

export default combineReducers({
    user: usersReducer,

  form:reduxFormReducer

});
