// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
   
      case 'FETCH_USERS_BY_APARTMENT':
        return  action.payload;
      default:
        return state;
    }
  };
  