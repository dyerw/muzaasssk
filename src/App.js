import React, { Component } from 'react'
import { connect } from 'react-redux'

import logo from './logo.svg';
import './App.css';
import ReviewStream from './ReviewStream/ReviewStream'
import * as actions from './ActionCreators'


class App extends Component {

  componentWillMount() {
    this.props.fetchReviewStream();
  }

  render() {
    return (
     <div>
        <ReviewStream {...this.props} />
     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.app.reviews,
    loadingStream: state.app.loadingStream
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchReviewStream: () => { dispatch(actions.fetchStreamData()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

