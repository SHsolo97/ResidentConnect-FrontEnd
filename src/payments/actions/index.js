import paymentsAPI from '../../misc/axios-calls/paymentsAPI';
import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';

import _ from 'lodash';

//to show payment details to resident
export const fetchPaymentOfApartment = (apartmentid) => async dispatch => {
    let searchQuery={
        "apartmentid":apartmentid
    }
  
    console.log(searchQuery);
  const response = await paymentsAPI.post('/payments/search',searchQuery);

  dispatch({ type: 'FETCH_PAYEMENTS_BY_APARTMENT', payload: response.data.payments});
};

//to show payment details to admin of community
export const fetchPaymentOfCommunity= (communityid) => async dispatch => {

    let searchQuery={
        "communityid":communityid
    }
    console.log(searchQuery);
  const response = await paymentsAPI.post('/payments/search',searchQuery);

  dispatch({ type: 'FETCH_PAYEMENTS_BY_COMMUNITY', payload: response.data.payments});
};

//to get one particular payment details by id
export const fetchPaymentById = (paymentid) => async dispatch => {

    let searchQuery={
        "_id":paymentid
    }
    console.log(searchQuery);
  const response = await paymentsAPI.post('/payments/search',searchQuery);
  let returnValue;
  if(response.data.payments.length>1)
        returnValue=response.data.payments[0];

  dispatch({ type: 'FETCH_PAYEMENT_BY_ID', payload: returnValue});
};

//fetch apartments by communityid
export const fetchApartmentsByCommunityid = (communityid) => async dispatch => {
  const response = await communityAPI.get(`/community/${communityid}/apartments`);
  dispatch({ type: 'FETCH_APARTMENTS_BY_COMMUNITY', payload: response.data.apartments});
};
//fetch community by id

export const fetchCommunityById= (communityid) => async dispatch => {
    const response = await communityAPI.get(`/community/${communityid}`);  
    dispatch({ type: 'FETCH_COMMUNITY_BY_ID', payload: response.data});
  };
  
//fetch user by id
export const fetchUser = id => async dispatch => {
    const response = await userAPI.get(`/users/${id}`);
  
    dispatch({ type: 'FETCH_USER', payload: response.data });
};

export const fetchResidentsOfCommunity = communityid => async dispatch => {
    let searchQuery={
        "communities":communityid,
        "type":"resident"
    }
    const response = await userAPI.post(`/users/search`,searchQuery);
  
    dispatch({ type: 'FETCH_RESIDENTS_BY_COMMUNITY', payload: response.data.users });
};

 