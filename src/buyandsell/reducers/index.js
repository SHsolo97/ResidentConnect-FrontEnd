import { combineReducers } from 'redux';

import categoriesReducer from './categoriesReducer';
import subCategoriesReducer from './subCategoriesReducer';


export default combineReducers({
 categories:categoriesReducer,

 subcategories:subCategoriesReducer

 


});
