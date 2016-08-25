import * as t from './ActionTypes'

export const receivedStreamData = (streamData) => { 
  console.log(streamData);
  return {
    type: t.RECEIVED_STREAM_DATA,
    payload: { streamData }
  }
}

export const fetchStreamData = () => {
  return {
    type: t.FETCH_STREAM_DATA
  }
}

