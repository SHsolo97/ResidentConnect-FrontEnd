import userAPI from '../../misc/axios-calls/userAPI';


export const fetchCurrentUser = (id) => async dispatch => {

    const response = await userAPI.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
  };

  