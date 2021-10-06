import buyAndSellAPI from '../../misc/axios-calls/buyAndSellAPI';
import _ from 'lodash';

export const getCategories = () => async dispatch => {

  const response = await buyAndSellAPI.get('/adverts/categories');
  //console.log(response);
  dispatch({ type: 'FETCH_CATEGORIES', payload: response.data.categories});
};
export const getSubCategories = (category) => async dispatch => {

 const searchQuery={category}
const response = await buyAndSellAPI.post(`/adverts/subcategories`,searchQuery);
//console.log(response);
dispatch({ type: 'FETCH_SUB_CATEGORIES', payload: response.subcategories});
};
