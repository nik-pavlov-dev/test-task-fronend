import thunk from 'redux-thunk';
import axios from 'axios';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { handleRequests } from '@redux-requests/core';
import { createDriver } from '@redux-requests/axios';

import config from '../config';
import auth from './auth/reducer';
import users from './users/reducer';

const loggerMiddleware = createLogger();

export const instance = axios.create({
  baseURL: config.api.url,
  withCredentials: true,
});

const { requestsReducer: requests, requestsMiddleware } = handleRequests({
  driver: createDriver(instance),
  onError: (e) => {
    // if (e.response && e.response.status === 401) router.replace('/login');
    throw e;
  },
});

const rootReducer = combineReducers({
  requests,
  auth,
  users,
});

const middlewares = [
  ...requestsMiddleware,
  thunk,
];

// Disable Logger at server side.
// eslint-disable-next-line no-undef
if (process.browser && process.env.NODE_ENV !== 'production') {
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
