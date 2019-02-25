import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="user-header">
          <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div className="user-tools">
              <div className="messages-notifications">
              </div>
              <div className="global-notifications">
                  <span></span>
              </div>
              <div className="user-info">
                  <div className="user-details">
                      <span>Luis Bolaños</span>
                      <strong>Administrador</strong>
                  </div>
                  <div className="avatar">
                      
                  </div>
              </div>
              <div className="logout">
              <Link to="/signout">Cerrar Sesión</Link>
              </div>
          </div>
      </div>
    );
  }
}

export default Header;
