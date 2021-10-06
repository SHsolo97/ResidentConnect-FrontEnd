import eventAPI from '../../misc/axios-calls/eventAPI';
import _ from 'lodash';

export const fetchCommunityEvents = (communityid) => async dispatch => {

    let searchQuery={
        "communityid":communityid
    }
    console.log(searchQuery);
  const response = await eventAPI.post('/community',searchQuery);

  dispatch({ type: 'FETCH_EVENTS', payload: response.data.events});
};
