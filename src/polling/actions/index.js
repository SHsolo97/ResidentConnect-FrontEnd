import pollingAPI from '../../misc/axios-calls/pollingAPI';


export const fetchPollsByCreator = (id) => async dispatch => {

  
    const searchQuery={
        "createdby":id
    }
    //console.log(searchQuery);
  const response = await pollingAPI.post('/pollings/search',searchQuery);
  //console.log(response.data.polls);

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