import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Dashboard from './components/Dashboard';
import Estadistica from './components/Estadistica';
import Movimientos from './components/Movimientos';
import Usuarios from './components/Usuarios';
import CreateUser from './components/CreateUser';
import ModifyUser from './components/ModifyUser';
import Ajustes from './components/Ajustes';
import SignIn from './components/auth/Signin';
import SignOut from './components/auth/Signout';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';


const store = createStore(
  reducers,
  {
    auth: { authenticaded: {
      auth_token: localStorage.getItem('bsctoken'),
      user_name:  localStorage.getItem('bscName'), 
      user_type: localStorage.getItem('bscType'), 
      avatar_url: localStorage.getItem('bscAvatar'), 
      user_id: localStorage.getItem('bscID')} 
    }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={SignIn} />
        <Route path="/recuperar" exact component={Forgot} />
        <Route path="/reset_password" exact component={Reset} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/movimientos" component={Movimientos} />
        <Route path="/usuarios" component={Usuarios} />
        <Route path="/crearusuario" component={CreateUser} />
        <Route path="/modificarusuario/:id" component={ModifyUser} />
        <Route path="/estadisticas" component={Estadistica} />
        <Route path="/ajustes" component={Ajustes} />
        <Route path="/signout" component={SignOut} />
      </App>
    </BrowserRouter>
  </Provider>,
    document.querySelector('#root')
);
