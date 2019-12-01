import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import User from './User';

ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
    {/* <Route path="/userDetails" component={User} /> */}
  </Router>, 
  document.querySelector('#root'));