import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Feature from './components/Feature';
import SignUp from './components/auth/Signup';
import SignIn from './components/auth/Signin';
import SignOut from './components/auth/Signout';
import Exchanges from './components/clients/Exchanges.js';
import AddExchange from './components/clients/AddExchange.js';

const store = createStore(
  reducers,
  {
    auth: { authenticaded: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/feature" component={Feature} />
        <Route path="/signout" component={SignOut} />
        <Route path="/my-exchanges" component={Exchanges} />
        <Route path="/add-exchange" component={AddExchange} />
      </App>
    </BrowserRouter>
  </Provider>,
    document.querySelector('#root')
);
