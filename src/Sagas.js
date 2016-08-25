import { takeEvery, takeLatest } from 'redux-saga'
import { call, apply, put } from 'redux-saga/effects'
import Api from './Api'
import * as c from './ActionCreators'
import * as t from './ActionTypes'

function* fetchStream(action) {
  console.log("fetching stream")
  try {
    const streamData = yield call(Api.fetchStream);
    const data = yield apply(streamData, streamData.json);
    yield put(c.receivedStreamData(data));
  } catch (e) {
    console.error(e);
  }
}

export function* fetchStreamSaga() {
    yield* takeEvery(t.FETCH_STREAM_DATA, fetchStream);
}
