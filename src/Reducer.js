import {
    combineReducers
} from 'redux';

import * as t from './ActionTypes';

const initialState = {
    loadingStream: true,
    reviews: []
}

const AppReducer = (state = initialState, {
    type,
    payload
}) => {
    switch (type) {
        case t.RECEIVED_STREAM_DATA:
            return {
                ...state,
                loadingStream: false,
                reviews: payload.streamData
            };

        default:
            return state;
    }
}

export default combineReducers({
    app: AppReducer
});
