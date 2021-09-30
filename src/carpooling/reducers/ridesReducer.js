
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
      case 'FETCH_MYRIDES':
        return action.payload;
        case 'FILTER_RIDES':
          return action.payload;
          case 'FETCH_RIDE_BY_ID':
            return action.payload;
        case 'SEARCH_RIDES':
            return action.payload;
      
        
            
      default:
        return state;
    }
  };