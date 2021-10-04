import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';
import paymentsAPI from '../../misc/axios-calls/paymentsAPI';
import announcementAPI from '../../misc/axios-calls/announcementAPI';
import carPoolingAPI from '../../misc/axios-calls/carPoolingAPI';
import pollingAPI from '../../misc/axios-calls/pollingAPI';
import _ from 'lodash';

//*********************************************************************************** */

export const fetchPollsByCreator = (id) => async dispatch => {

  
    const searchQuery={
        "createdby":id
    }
  const response = await pollingAPI.post('/pollings/search',searchQuery);

  dispatch({ type: 'FETCH_POLLS_BY_CREATOR', payload: response.data.polls});
};

export const fetchActivePollsByCommunity = (communityid) => async dispatch => {

   const cutoff=new Date();
    const searchQuery={
        communityid,
        "expiredat": {$gt: cutoff}
    }
  const response = await pollingAPI.post('/pollings/search',searchQuery);

  dispatch({ type: 'FETCH_ACTIVE_POLLS_BY_COMMUNITY', payload: response.data.polls});
};
//*********************************************************************************** */

export const fetchAnnouncementsByCommunity = (communityid) => async dispatch => {

     const searchQuery={
         communityid,
       
     }
   const response = await announcementAPI.post('/announcements/search',searchQuery);
 
   dispatch({ type: 'FETCH_ANNOUNCEMENTS_BY_COMMUNITY', payload: response.data.announcements});
 };
 //*********************************************************************************** */

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
//*********************************************************************************** */
export const fetchUsersByApartmentId = (apartmentid) => async dispatch => {
  let searchQuery={
      "apartments.apartmentid":apartmentid
  }

  console.log(searchQuery);
const response = await userAPI.post('/users/search',searchQuery);

dispatch({ type: 'FETCH_USERS_BY_APARTMENT', payload: response.data.users});
};
export const fetchUsersOverview = (communityid) => async dispatch => {

    const searchQuery=
    {
        "communities": communityid

    }
    console.log(searchQuery);
  const response = await userAPI.post('/users/summary',searchQuery);
  let result={
      total:0,
      admin:0,
      resident:0
  };
  if(response.data.length!==0)
   {  
       // eslint-disable-next-line array-callback-return
       response.data.map(user=>{
         ;
        if(user._id.type==='admin')
        {
            result.admin=user.total;
            result.total=result.total+ user.total;
        }
        else if(user._id.type==='resident')
                 {
                     result.resident=user.total;
                     result.total=result.total+ user.total;
                 }
    })
    }
    console.log(result);
  dispatch({ type: 'FETCH_USERS_DATA', payload:result});
};
//*********************************************************************************** */

export const fetchApartmentsOverview = (communityid) => async dispatch => {

    const searchQuery=
    {
        "communityid": communityid

    }
    console.log(searchQuery);
  const response = await communityAPI.post('/community/apartments/summary',searchQuery);
  let result={
      total:0,
      status:[]
  };
  if(response.data.length!==0)
   {  
       // eslint-disable-next-line array-callback-return
       response.data.map(apttype=>{
           console.log(apttype);
           const type= apttype._id.status;
           const count=apttype.total;
           const val={type,count}
           result.status.push(val);
           result.total= result.total+ count;
           
      
    })
    }
    console.log(result);
  dispatch({ type: 'FETCH_APARTMENTS_DATA', payload:result});
};
//*********************************************************************************** */

export const fetchReceivedRideRequestsDetails = userid => async (dispatch,getState) => {

  await 
  dispatch(fetchRideRequestsByRideOwner(userid))
 _.chain(getState().ridereqs)
   .map('requestedby')
   .uniq()
   .forEach(id => dispatch(fetchUser(id)))
   .value();


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