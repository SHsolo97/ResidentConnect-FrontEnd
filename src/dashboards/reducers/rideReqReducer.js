
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_RIDE_REQUESTS_BY_RIDE_ID':
        return action.payload;
      case  'FETCH_RIDE_REQUESTS_BY_REQUESTER':
           return action.payload
      case 'FETCH_RIDE_REQUESTS_BY_OWNER_ID':
        return action.payload; 
      default:
        return state;
    }
  };