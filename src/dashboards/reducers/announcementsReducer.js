// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
    switch (action.type) {
      case 'FETCH_ANNOUNCEMENTS_BY_COMMUNITY':
        return  action.payload;
      default:
        return state;
    }
  };
  