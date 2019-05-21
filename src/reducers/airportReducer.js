import initialState from './initialState';

import * as actionTypes from '../actions/actionTypes';

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET:
            return initialState;
        
        case actionTypes.ADD_AIRPORT:
            return {
                ...state,
                watching: [
                    ...state.watching,
                    action.code
                ]
            };
        case actionTypes.REMOVE_AIRPORT:
            const newWatching = state.watching.filter((el) => el !== action.code);
            return {
                ...state,
                watching: newWatching,
            };
        default:
            return state;
    }
};
