import {
    combineReducers
} from 'redux';

import * as t from './ActionTypes';

const initialState = {
    loadingStream: true,
    reviews: [],
    reviewEditorShowing: false,
    loadingAlbumSuggestions: false,
    albumSuggestions: [],
    reviewEditorAlbumValue: ""
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

        case t.SHOW_REVIEW_EDITOR:
            return {
              ...state,
              reviewEditorShowing: true
            }

        case t.REVIEW_EDITOR_ALBUM_INPUT_CHANGED:
            return {
              ...state,
              reviewEditorAlbumValue: payload.value
            }

        case t.REVIEW_EDITOR_ALBUM_SUGGESTIONS_REQUESTED:
            return {
              ...state,
              loadingAlbumSuggestions: true
            }

        case t.REVIEW_EDITOR_RECEIVED_ALBUM_SUGGESTIONS:
            return {
              ...state,
              albumSuggestions: payload.suggestions,
              loadingAlbumSuggestions: false
            }

        case t.REVIEW_EDITOR_ALBUM_SELECTED:
            return {
              ...state,
              reviewEditorAlbumValue: payload.suggestion.album
            }

        case t.CLEAR_ALBUM_SUGGESTIONS:
          return {
            ...state,
            albumSuggestions: []
          }

        default:
            return state;
    }
}

export default combineReducers({
    app: AppReducer
});
