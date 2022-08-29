import {combineReducers} from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router'
import {createBrowserHistory} from 'history';
import {generalReducer} from '../reducers';

export const history = createBrowserHistory();

export const getReducers = () =>
  combineReducers({
    router: createRouterReducer(history),
    general: generalReducer,
  });

export const middlewares = [];
