import {
    takeEvery,
    takeLatest
} from 'redux-saga';
import {
    call,
    apply,
    put
} from 'redux-saga/effects';
import _ from 'lodash';
import Promise from 'bluebird';

import Api from './Api';
import * as MusicBrainzApi from './MusicBrainzApi';
import * as c from './ActionCreators';
import * as t from './ActionTypes';

function* fetchSuggestions(action) {
  yield Promise.delay(2000); // debounce
  console.log("fetching suggestions");
  try {
    let albumSuggestions = yield call(MusicBrainzApi.fetchSearch, action.payload.value);
    albumSuggestions = albumSuggestions['release-groups'].map(r => {
      return {
        id: r.id,
        album: r.title,
        artist: r['artist-credit'][0].artist.name,
        albumArtUrl: MusicBrainzApi.getAlbumArtUrl(r.id)
      };
    });

    yield put(c.receivedAlbumSuggestions(albumSuggestions));
  } catch (e) {
      console.error(e);
  }
}

function* fetchStream(action) {
    console.log("fetching stream");
    try {
        const streamData = yield call(Api.fetchStream);
        const albumInfo = yield call(MusicBrainzApi.fetchAlbums, streamData.map(d => d.mbid));

        // Get related artist info
        for (let i = 0; i < streamData.length; i++) {
            let data = streamData[i];
            let relatedArtists = yield call(MusicBrainzApi.fetchArtists, data.relatedArtists);
            data.relatedArtists = relatedArtists.map(a => a.name);
        }

        // Get album art
        // const albumArt = yield call(MusicBrainzApi.fetchAlbumArts, streamData.map(d => d.mbid));

        const streamDataWithAlbumInfo = streamData.map(d => {
            let albumInfoForData = _.find(albumInfo, x => x.id === d.mbid);
            return _.merge(d, albumInfoForData, {artist: albumInfoForData['artist-credit'][0].name});
        });
        yield put(c.receivedStreamData(streamDataWithAlbumInfo));
    } catch (e) {
        console.error(e);
    }
}

function* fetchAlbumInformation(action) {
    let mbid = action.payload.suggestion.id;
    const albumInfo = yield call(MusicBrainzApi.fetchAlbum, mbid);
    console.log(albumInfo)
    const albumArtUrl = MusicBrainzApi.getAlbumArtUrl(mbid);
    const enrichedAlbumInfo = {
      ...action.payload.suggestion,
      date: albumInfo['first-release-date'],
      albumArtUrl: albumArtUrl
    }
    yield put(c.receivedSelectedAlbumInfo(enrichedAlbumInfo));
}

export function* fetchStreamSaga() {
    yield * takeEvery(t.FETCH_STREAM_DATA, fetchStream);
}

export function* albumSuggestionsSaga() {
   yield * takeLatest(t.REVIEW_EDITOR_ALBUM_SUGGESTIONS_REQUESTED, fetchSuggestions);
}

export function* albumInformationSaga() {
  yield * takeLatest(t.REVIEW_EDITOR_ALBUM_SELECTED, fetchAlbumInformation);
}
