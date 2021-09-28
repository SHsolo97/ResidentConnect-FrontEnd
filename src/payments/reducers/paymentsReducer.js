
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PAYEMENTS_BY_APARTMENT':
        return action.payload;
      case 'FETCH_PAYEMENTS_BY_COMMUNITY':
            return action.payload;
      case 'FETCH_PAYEMENTS_HISTORY_BY_APARTMENT':
        return action.payload;
      case 'FETCH_PAYEMENTS_HISTORY_BY_COMMUNITY':
        return action.payload;
         
      default:
        return state;
    }
  };