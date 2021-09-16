import facilityAPI from '../../misc/axios-calls/facilityAPI';
import userAPI from '../../misc/axios-calls/userAPI';
import _ from 'lodash';


export const fetchFacilityTypes= () => async dispatch => {
 
    const response = await facilityAPI.get('/facilities/faciltytypes');
  
    dispatch({ type: 'FETCH_FACILITIY_TYPES', payload: response.data.facilityTypes});
  };
export const fetchFacilities = (searchQuery) => async dispatch => {
  console.log(searchQuery);
  const response = await facilityAPI.post('/facilities/search',searchQuery);

  dispatch({ type: 'FETCH_FACILITIES', payload: response.data.facilities});
};
export const fetchFacilityBookings = (searchQuery) => async dispatch => {

    console.log(searchQuery);
  const response = await facilityAPI.post('/facilities/booking/search',searchQuery);

  dispatch({ type: 'FETCH_FACILITY_BOOKING', payload: response.data.bookings});
};
export const fetchUser = id => async dispatch => {
    const response = await userAPI.get(`/users/${id}`);
  
    dispatch({ type: 'FETCH_USER', payload: response.data });
  };
  export const fetchFacilityBookingsAndUsers = (searchQuery) => async (dispatch, getState) => {
    await dispatch(fetchFacilityBookings(searchQuery));
  
    _.chain(getState().bookings)
      .map('bookedby')
      .uniq()
      .forEach(id => dispatch(fetchUser(id)))
      .value();
  };
  