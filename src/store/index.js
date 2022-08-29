import {createStore as createReduxStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createRouterMiddleware } from '@lagunovsky/redux-react-router'
import * as reduxStore from './appStore';

export const {history} = reduxStore;

export const getMiddlewares = (middlewares = []) =>
  composeWithDevTools({trace: true, traceLimit: 25})(
    applyMiddleware(thunkMiddleware, createRouterMiddleware(history), ...middlewares),
  );

export const createStore =
  ({getReducers, getPersistedState = Function.prototype, middlewares = []}) =>
  (props = {}) => {
    const store = createReduxStore(
      getReducers(props),
      getPersistedState(props),
      getMiddlewares(middlewares),
    );

    return {
      store,
    };
  };

export const {store} = createStore(reduxStore)();
