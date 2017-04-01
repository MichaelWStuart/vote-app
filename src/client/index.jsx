import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import App from './app';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
import { isProd } from '../shared/util';

// eslint-disable-next-line no-underscore-dangle
const tools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  combineReducers({}),
  isProd ? undefined : tools,
);

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR);

const wrapApp = (AppComponent, reduxStore) =>
  <Provider store={reduxStore}>
    <BrowserRouter>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </BrowserRouter>
  </Provider>;

ReactDOM.render(wrapApp(App, store), rootEl);

if (module.hot) {
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default;
    ReactDOM.render(wrapApp(NextApp, store), rootEl);
  });
}
