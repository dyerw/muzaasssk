import React, { Component } from 'react'
import { connect } from 'react-redux'

import logo from './logo.svg';
import './App.css';
import ReviewStream from './ReviewStream/ReviewStream'
import FilterBar from './FilterBar/FilterBar'
import ReviewEditor from './ReviewEditor/ReviewEditor'
import * as actions from './ActionCreators'


class App extends Component {

  componentWillMount() {
    this.props.fetchReviewStream();
  }

  render() {
    let reviewEditor = null;
    if (this.props.reviewEditorShowing) {
      reviewEditor = <ReviewEditor albumSuggestions={this.props.albumSuggestions}
                                   selectedAlbumInfo={this.props.selectedAlbumInfo}
                                   reviewEditorAlbumSelected={this.props.reviewEditorAlbumSelected}
                                   loadingAlbumSuggestions={this.props.loadingAlbumSuggestions}
                                   requestAlbumSuggestions={this.props.requestAlbumSuggestions}
                                   requestAlbumSuggestions={this.props.requestAlbumSuggestions}
                                   reviewEditorAlbumValue={this.props.reviewEditorAlbumValue}
                                   clearAlbumSuggestions={this.props.clearAlbumSuggestions}
                                   reviewEditorAlbumInputChanged={this.props.reviewEditorAlbumInputChanged} />
    }

    return (
     <div>
        {reviewEditor}
        <FilterBar showReviewEditor={this.props.showReviewEditor} />
        <ReviewStream {...this.props} />
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.app
}

const mapDispatchToProps = (dispatch) => {
  return {
    reviewEditorAlbumSelected: (event, suggestion) => { dispatch(actions.reviewEditorAlbumSelected(event, suggestion)) },
    fetchReviewStream: () => { dispatch(actions.fetchStreamData()) },
    showReviewEditor: () => { dispatch(actions.showReviewEditor()) },
    reviewEditorAlbumInputChanged: (value) => { dispatch(actions.reviewEditorAlbumInputChanged(value)) },
    requestAlbumSuggestions: x => { dispatch(actions.requestAlbumSuggestions(x)) },
    clearAlbumSuggestions: () => { dispatch(actions.clearAlbumSuggestions()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
