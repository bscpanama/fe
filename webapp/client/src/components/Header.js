import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { changeMenuStatus, SITE_URL } from '../actions/index.js';

class Header extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.auth);
  }

  render() {
    let avatarImg = '';
    let user_name = '';
    let user_type = '';
    let avatarImage = {};
    if(typeof this.props.auth.avatar_url !== 'undefined'){
      user_name = this.props.auth.user_name;
      user_type = this.props.auth.user_type;
      if(this.props.auth.avatar_url != 'default') {
        avatarImg = SITE_URL + this.props.auth.avatar_url;
        avatarImage = {
          backgroundImage: `url(${avatarImg})`,
          backgroundSize: 'cover'
        };
      }
    } else {
      user_name = this.props.auth.authenticaded.user_name;
      user_type = this.props.auth.authenticaded.user_type;
      if(this.props.auth.authenticaded.avatar_url != 'default') {
        avatarImg = SITE_URL + this.props.auth.authenticaded.avatar_url;
        avatarImage = {
          backgroundImage: `url(${avatarImg})`,
          backgroundSize: 'cover'
        };
      }
    }
    return (
      <div className="user-header">
          <div className="menu-icon" onClick={() => this.props.changeMenuStatus(this.props.menustatus) }>
              <span></span>
              <span></span>
              <span></span>
          </div>
          <div className="user-tools">
              
              <div className="user-info">
                  <div className="user-details">
                      <span>{user_name}</span>
                      <strong>{user_type}</strong>
                  </div>
                  <div className="avatar"  style={avatarImage}>                      
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

function mapStateToProps({ auth, movements }) {
    const { menustatus } = movements;
    return { auth, menustatus };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeMenuStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
