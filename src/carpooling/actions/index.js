import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';
import userAPI  from '../../misc/axios-calls/userAPI';
import _ from 'lodash';

export const fetchMyRides = (userid) => async dispatch => {

    const searchQuery={
        creator:userid
    }
    console.log(searchQuery);
  const response = await carPoolingAPI.post('/carpoolings/rides/search',searchQuery);
  console.log(response);
  dispatch({ type: 'FETCH_MYRIDES', payload: response.data.rides});
};
export const fetchRideById = (id) => async dispatch => {

 
const response = await carPoolingAPI.get(`/carpoolings/rides/${id}`);
console.log(response);
dispatch({ type: 'FETCH_RIDE_BY_ID', payload: response.data});
};
export const filterRide= (searchQuery) => async dispatch => {

   
  const response = await carPoolingAPI.post('/carpoolings/rides/filter',searchQuery);
  dispatch({ type: 'FILTER_RIDES', payload: response.data.rides});
  };
  
export const searchRides= (searchQuery) => async dispatch => {

   
    console.log(searchQuery);
  const response = await carPoolingAPI.post('/carpoolings/rides/search',searchQuery);
  console.log(response);
  dispatch({ type: 'SEARCH_RIDES', payload: response.data.rides});
};

export const fetchUser = id => async dispatch => {
  const response = await userAPI.get(`/users/${id}`);
  console.log(response.data);
  dispatch({ type: 'FETCH_USER', payload: response.data });
};
export const fetchRideRequestsByRideId = rideid => async dispatch => {
  const searchQuery={ride:rideid};
  const response = await carPoolingAPI.post(`/carpoolings/riderequests/search`,searchQuery);
  console.log(response.data.ridereqs);
  dispatch({ type: 'FETCH_RIDE_REQUESTS_BY_RIDE_ID', payload: response.data.ridereqs});
};
export const fetchRideRequestsByRideOwner = userid => async dispatch => {
  const searchQuery={owner:userid};
  const response = await carPoolingAPI.post(`/carpoolings/riderequests/search`,searchQuery);

  dispatch({ type: 'FETCH_RIDE_REQUESTS_BY_OWNER_ID', payload: response.data.ridereqs});
};
export const fetchRideRequestsByRequester = userid => async dispatch => {
  const searchQuery={requestedby:userid};
  const response = await carPoolingAPI.post(`/carpoolings/riderequests/search`,searchQuery);

  dispatch({ type: 'FETCH_RIDE_REQUESTS_BY_REQUESTER', payload: response.data.ridereqs});
};
export const fetchMyRideRequestsDetails = userid => async (dispatch,getState) => {
      await 
      dispatch(fetchRideRequestsByRequester(userid))
     _.chain(getState().ridereqs)
       .map('owner')
       .uniq()
       .forEach(id => dispatch(fetchUser(id)))
       .value();

       
};
export const fetchMyRideRequestsByRideId = rideId => async (dispatch,getState) => {
  console.log("fetchMyRideRequestsByRideId");
  await 
  dispatch(fetchRideRequestsByRideId(rideId))
 _.chain(getState().ridereqs)
   .map('requestedby')
   .uniq()
   .forEach(id => dispatch(fetchUser(id)))
   .value();

   
};
export const fetchReceivedRideRequestsDetails = userid => async (dispatch,getState) => {

  await 
  dispatch(fetchRideRequestsByRideOwner(userid))
 _.chain(getState().ridereqs)
   .map('requestedby')
   .uniq()
   .forEach(id => dispatch(fetchUser(id)))
   .value();


};


export const filterRideWithUser= (searchQuery) => async (dispatch, getState) => {

   
  await dispatch(filterRide(searchQuery))
  _.chain(getState().rides)
    .map('creator')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
  };

