import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyBc8_7NB7AmAQs7EqyrqFssAfbyCzgT79o',
  authDomain: 'multiply-chat-app.firebaseapp.com',
  databaseURL: 'https://multiply-chat-app.firebaseio.com',
  projectId: 'multiply-chat-app',
  storageBucket: 'multiply-chat-app.appspot.com',
  messagingSenderId: '593953750973',
  appId: '1:593953750973:web:cc8949111152cd60409cd4',
  measurementId: 'G-TFJE6KM86D'
});

const routing = (
  <Router>
    <div id='routing-containter'>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
