import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import pollingAPI from '../../misc/axios-calls/pollingAPI';
import _ from 'lodash';


export const fetchPollsByCreator = (id) => async dispatch => {

  
    const searchQuery={
        "createdby":id
    }
  const response = await pollingAPI.post('/pollings/search',searchQuery);

  dispatch({ type: 'FETCH_POLLS_BY_CREATOR', payload: response.data.polls});
};