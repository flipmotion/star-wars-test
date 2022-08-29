import {combineReducers} from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router'
import {createMemoryHistory} from 'history';
import {generalReducer} from '../reducers';

export const history = createMemoryHistory();

export const getReducers = () =>
  combineReducers({
    router: createRouterReducer(history),
    general: generalReducer,
  });

export const middlewares = [];
