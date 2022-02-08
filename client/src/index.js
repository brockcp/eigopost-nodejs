import React from 'react';
import * as ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Main.css';
import {accountService} from './_services';

accountService.refreshToken();
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
