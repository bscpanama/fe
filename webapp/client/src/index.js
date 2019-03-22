import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Estadistica from './components/Estadistica';
import Movimientos from './components/Movimientos';
import Usuarios from './components/Usuarios';
import CreateUser from './components/CreateUser';
import Ajustes from './components/Ajustes';
import SignIn from './components/auth/Signin';
import SignOut from './components/auth/Signout';

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
        <Route path="/" exact component={SignIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/movimientos" component={Movimientos} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/crearusuario" component={CreateUser} />
        <Route path="/estadisticas" component={Estadistica} />
        <Route path="/ajustes" component={Ajustes} />
        <Route path="/signout" component={SignOut} />
      </App>
    </BrowserRouter>
  </Provider>,
    document.querySelector('#root')
);
