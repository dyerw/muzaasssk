import * as t from './ActionTypes'

export const receivedStreamData = (streamData) => {
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

export const showReviewEditor = () => {
  return {
    type: t.SHOW_REVIEW_EDITOR
  }
}

export const reviewEditorAlbumInputChanged = (event) => {
  return {
    type: t.REVIEW_EDITOR_ALBUM_INPUT_CHANGED,
    payload: { value: event.target.value }
  }
}

export const requestAlbumSuggestions = ({ value }) => {
  return {
    type: t.REVIEW_EDITOR_ALBUM_SUGGESTIONS_REQUESTED,
    payload: { value }
  }
}

export const receivedAlbumSuggestions = (suggestions) => {
  return {
    type: t.REVIEW_EDITOR_RECEIVED_ALBUM_SUGGESTIONS,
    payload: { suggestions }
  }
}

export const reviewEditorAlbumSelected = (event, { suggestion }) => {
  return {
    type: t.REVIEW_EDITOR_ALBUM_SELECTED,
    payload: { suggestion }
  }
}

export const clearAlbumSuggestions = () => {
  return {
    type: t.CLEAR_ALBUM_SUGGESTIONS
  }
}

export const receivedSelectedAlbumInfo = (info) => {
  return {
    type: t.RECEIVED_SELECTED_ALBUM_INFO,
    payload: { info }
  }
}
