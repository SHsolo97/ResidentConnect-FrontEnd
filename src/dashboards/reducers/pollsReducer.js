
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_POLLS_BY_CREATOR':
        return action.payload;
      case 'FETCH_ACTIVE_POLLS_BY_COMMUNITY':
        return action.payload;
        
     
      default:
        return state;
    }
  };