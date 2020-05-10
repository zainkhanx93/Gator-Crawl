import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import userReducer from './Store/Reducers/userReducer';
import teamReducer from './Store/Reducers/teamReducer';
import loginReducer from './Store/Reducers/loginReducer';
import registerReducer from './Store/Reducers/registerReducer';
import homeReducer from './Store/Reducers/homeReducer';
import messageReducer from './Store/Reducers/messageReducer';

import rootSaga from './Sagas/rootSaga';

import './index.css';
import App from './App';

import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  teamReducer,
  loginReducer,
  registerReducer,
  homeReducer,
  userReducer,
  messageReducer,
  form: formReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
