import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { ReduxRouter } from '@lagunovsky/redux-react-router'

import Content from './components/Content';
import Character from './components/Character';
import {history, store} from './store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxRouter history={history} store={store}>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route index element={<Content />}/>
            <Route path="character/:characterId" element={<Character />}/>
          </Route>
        </Routes>
      </ReduxRouter>
    </Provider>
  </React.StrictMode>
);
