import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';
import paymentsAPI from '../../misc/axios-calls/paymentsAPI';
import pollingAPI from '../../misc/axios-calls/pollingAPI';
import _ from 'lodash';


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
  if(response.data.length!=0)
   {  
       response.data.map(user=>{
           console.log(user);
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
  if(response.data.length!=0)
   {  
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
