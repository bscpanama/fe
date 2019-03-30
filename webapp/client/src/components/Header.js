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
    if(this.props.auth.avatar_url != 'default') {
      avatarImg = SITE_URL + this.props.auth.authenticaded.avatar_url
    }   

    let avatarImage = {
      backgroundImage: `url(${avatarImg})`,
      backgroundSize: 'cover'
    };
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
                      <span>{this.props.auth ? this.props.auth.authenticaded.user_name : 'Guest'}</span>
                      <strong>{this.props.auth ? this.props.auth.authenticaded.user_type : 'guest'}</strong>
                  </div>
                  <div className="avatar" style={this.props.auth.authenticaded.avatar_url != 'default' ? avatarImage : '' }>
                      
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
