import { combineReducers } from 'redux'

import * as t from './ActionTypes'

const initialState = {
  reviews: []
}

const AppReducer = (state = initialState, {type, payload}) => {
  switch(type) {
    case t.RECEIVED_STREAM_DATA:
      return {
        ...state,
        reviews: payload.streamData
      }

    default:
      return state
  }
}

export default combineReducers({
  app: AppReducer
});

