import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';

class AppHeader extends Component {
  render() {
    return (
      <div>
        <div className="header clearfix">
          <div className="menu-holder">
            <img src="/assets/menu-icon.svg" className="img-responsive" alt="Menu" />
          </div>
          <div className="logo-holder">
            <img src="/assets/cryptovac-logo.svg" className="img-responsive" alt="CryptoVAC" />
          </div>
          <div className="user-options-bar">
            <div className="user-meta">
              <div className="profile-picture">
                <span className="placeholder-image"></span>
              </div>
              <span className="user-name">
                John Doe
              </span>
            </div>
          </div>
          <div className="notification-bell">
            <SVG
              src="/assets/notification-bell.svg"
            >
            </SVG>
          </div>
        </div>
        <div className="menu-sider-bar">
          <ul>
            <li>
              <a href="#">
                <div className="menu-icon">
                  <SVG
                    src="/assets/arbitrage-icon.svg"
                  >
                  </SVG>
                </div>
                Arbitrage
              </a>
            </li>
            <li>
              <a href="#">
                <div className="menu-icon">
                  <SVG
                    src="/assets/average-icon.svg"
                  >
                  </SVG>
                </div>
                Average
              </a>
            </li>
            <li className="selected">
              <a href="#">
                <div className="menu-icon">
                  <SVG
                    src="/assets/trader-tools-icon.svg"
                  >
                  </SVG>
                </div>
                Trader
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default AppHeader;
