import { useProfile } from '../../context/profile.context';
import classifiedAPI from '../../misc/axios-calls/classifiedAPI';
import userAPI from '../../misc/axios-calls/userAPI';
import _ from 'lodash';

import axios from 'axios';

export const fetchClassifieds = (communityid) => async dispatch => {

    let searchQuery={
        "communityid":communityid
    }
    console.log(searchQuery);
  const response = await classifiedAPI.post('/classifieds/search',searchQuery);

  dispatch({ type: 'FETCH_CLASSIFIEDS', payload: response.data.classifieds});
};
export const fetchComments = (classifiedid) => async dispatch => {

    let searchQuery={
        "classifiedid":classifiedid
    }
    console.log(searchQuery);
  const response = await classifiedAPI.post('/classifieds/comments/search',searchQuery);

  dispatch({ type: 'FETCH_COMMENTS', payload: response.data.comments});
};
export const fetchUser = id => async dispatch => {
    const response = await userAPI.get(`/users/${id}`);
  
    dispatch({ type: 'FETCH_USER', payload: response.data });
  };
  export const fetchCommentsAndUsers = (classifiedid) => async (dispatch, getState) => {
    await dispatch(fetchComments(classifiedid));
  
    _.chain(getState().comments)
      .map('givenby')
      .uniq()
      .forEach(id => dispatch(fetchUser(id)))
      .value();
  };
  