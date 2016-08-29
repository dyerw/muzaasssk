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

import Api from './Api';
import * as MusicBrainzApi from './MusicBrainzApi';
import * as c from './ActionCreators';
import * as t from './ActionTypes';


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
            console.log(relatedArtists);
        }

        // Get album art
        //    const albumArt = yield call(MusicBrainzApi.fetchAlbumArts, streamData.map(d => d.mbid));

        const streamDataWithAlbumInfo = streamData.map(d => {
            let albumInfoForData = _.find(albumInfo, x => x.id === d.mbid);
            return _.merge(d, albumInfoForData, {artist: albumInfoForData['artist-credit'][0].name});
        });
        console.log(streamDataWithAlbumInfo);
        yield put(c.receivedStreamData(streamDataWithAlbumInfo));
    } catch (e) {
        console.error(e);
    }
}

export function* fetchStreamSaga() {
    yield * takeEvery(t.FETCH_STREAM_DATA, fetchStream);
}
