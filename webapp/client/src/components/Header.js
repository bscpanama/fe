import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

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
                      <span>{this.props.auth.authenticaded.user_name}</span>
                      <strong>{this.props.auth.authenticaded.user_type}</strong>
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

function mapStateToProps({ auth }) {
    console.log(auth);
    return { auth };
}

export default connect(mapStateToProps)(Header);
