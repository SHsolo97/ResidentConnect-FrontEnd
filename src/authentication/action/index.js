import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';

import _ from 'lodash';
export const fetchUser= (userid) => async dispatch => {
  const response = await userAPI.get(`/users/${userid}`);
  dispatch({ type: 'FETCH_USER', payload: response.data});
};
export const fetchApartment= (apartmentid) => async dispatch => {

    let searchQuery={
        "_id":apartmentid
    }
    //console.log(searchQuery);
  const response = await communityAPI.post('/community/apartments',searchQuery);

  dispatch({ type: 'FETCH_APARTMENT', payload: response.data.apartments[0]});
};
export const fetchCommunity = id => async dispatch => {
    const response = await communityAPI.get(`/community/${id}`);
  
    dispatch({ type: 'FETCH_COMMUNITY', payload: response.data });
  };
