const filterReducer = (state = 'ALL', action) => {
    switch (action.type){
        case 'SET_FILTER':
            return action.filter;
        default:
            return state;
    }
}

//The action for changing the state of the filter looks like this:
//          {
//              type: 'SET_FILTER',
//              filter: 'IMPORTANT'
//          }

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        filter: filter
    }
}

export default filterReducer;