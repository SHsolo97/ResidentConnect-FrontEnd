import { combineReducers } from 'redux';

import {reducer as reduxFormReducer} from 'redux-form';
import pollsReducer from './pollsReducer';

export default combineReducers({
  polls:pollsReducer,
  form:reduxFormReducer

});
