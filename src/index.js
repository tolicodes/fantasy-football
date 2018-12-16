import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { register as registerServiceWorker } from './serviceWorker';

import './index.css';

import reducer from './reducer';
import saga from './saga';

import firebase from 'firebase';

import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import config from './config';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

firebase.initializeApp(config);

// mount it on the Store
const store = createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

// then run the saga
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();