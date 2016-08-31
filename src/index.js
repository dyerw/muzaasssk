import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import reducer from './Reducer'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import * as sagas from './Sagas'

const sagaMiddleware = createSagaMiddleware()

let store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas.fetchStreamSaga);
sagaMiddleware.run(sagas.albumSuggestionsSaga);
sagaMiddleware.run(sagas.albumInformationSaga);

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
