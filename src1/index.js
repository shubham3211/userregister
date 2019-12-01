import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Product from './Product';
import { Provider } from 'react-redux';
import configureStore from './redux-store' 
import Course from './course';
import NewIt from './components/newIt';
import Digital from './components/digital';
import UiComp from './components/UiComp';
import DigitalParams from './components/DiditalParams';
import Contact from './components/contact';
import Email from './components/Email';
import Feedback from './components/Feedback';
import About from './components/about';

let store  = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
      <Route path="/product" component={Product} />
      <Route path="/course" component={Course} />
      <Route path="/about" component={About} />
      <Route path="/about/newit" component={NewIt} />
      <Route path="/about/digital" component={Digital} />
      <Route path="/about/digital/id/name" exact component={UiComp} />
      <Route path="/about/digital/:id/:name" exact component={DigitalParams} />
      <Route path="/contact" component={Contact} />
      <Route path="/contact/email" component={Email} />
      <Route path="/contact/feedback" component={Feedback} />
    </Router>
  </Provider>,
  document.querySelector('#root')
)
