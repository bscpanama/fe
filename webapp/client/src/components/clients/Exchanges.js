import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppHeader from '../AppHeader.js';

class Exchanges extends Component {
  componentDidMount() {
    document.title = "My Exchanges - CryptoVAC";
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div className="main-wrapper my-exchanges">
          <div className="content-header clearfix">
            <div className="title">
              <h1>My Exchanges (4)</h1>
            </div>
            <div className="main-action">
              <Link to="/add-exchange" className="button green-button add-action">Add New</Link>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="table table-no-one">
              <div className="table-head">
                <div className="table-row">
                  <div>No.</div>
                  <div>Exchange</div>
                  <div>Trader</div>
                  <div>History (Recent)</div>
                  <div>Actions</div>
                </div>
              </div>
              <div className="table-body">
                <div className="table-row">
                  <div>1</div>
                  <div>Binance</div>
                  <div>Frank Ojeda</div>
                  <div>No history</div>
                  <div className="actions">
                    <span><img src="/assets/action-edit-icon.svg" className="img-responsive edit-icon" alt="Edit" /></span>
                    <span><img src="/assets/action-delete-icon.svg" className="img-responsive delete-icon" alt="Delete" /></span>
                  </div>
                </div>
                <div className="table-row">
                  <div>2</div>
                  <div>Binance</div>
                  <div>Ivan Granados</div>
                  <div>No history</div>
                  <div className="actions">
                    <span><img src="/assets/action-edit-icon.svg" className="img-responsive edit-icon" alt="Edit" /></span>
                    <span><img src="/assets/action-delete-icon.svg" className="img-responsive delete-icon" alt="Delete" /></span>
                  </div>
                </div>
                <div className="table-row">
                  <div>3</div>
                  <div>Binance</div>
                  <div>Carlos Puentes</div>
                  <div>No history</div>
                  <div className="actions">
                    <span><img src="/assets/action-edit-icon.svg" className="img-responsive edit-icon" alt="Edit" /></span>
                    <span><img src="/assets/action-delete-icon.svg" className="img-responsive delete-icon" alt="Delete" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pagination">
            <ul>
              <li className="selected">
                <span>1</span>
              </li>
              <li><span>2</span></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Exchanges;
