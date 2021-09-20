import { useProfile } from '../../context/profile.context';
import userAPI from '../../misc/axios-calls/userAPI';


export const fetchCurrentUser = (id) => async dispatch => {

    const response = await userAPI.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
  };

  