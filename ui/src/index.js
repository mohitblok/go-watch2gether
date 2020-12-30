import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import {
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux'
import store, {history} from './store'
import { ConnectedRouter } from 'connected-react-router'


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <Route path="/room/:id">
            <App />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
