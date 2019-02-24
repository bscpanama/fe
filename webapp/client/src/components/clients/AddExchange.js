import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppHeader from '../AppHeader.js';

class AddExchange extends Component {
  componentDidMount() {
    document.title = "Add Exchange - CryptoVAC";
  }

  render() {
    return (
      <div>
        <AppHeader />
        <div className="main-wrapper my-exchanges">
          <div className="content-header clearfix">
            <div className="title">
              <h1>Add Exchange</h1>
            </div>
            <div className="main-action">
              <button className="button green-button add-action">Add Exchange</button>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="left-side-form">
            	<div className="form-wrapper">
            		<div className="form-control half-input-line first-control">
            			<label>
            				Exchange
            			</label>
            			<select name="exchange" id="exchange">
            				<option value="Binance">Binance</option>
            				<option value="Bitrex">Bitrex</option>
            			</select>
            		</div>
            		<div className="form-control half-input-line">
            			<label>
            				Trader ID #
            			</label>
            			<input type="text" name="trade-id" id="trade-id" value="" />
            		</div>
                <div className="form-control half-input-line first-control">
                  <label>
                    API Key
                  </label>
                  <input type="text" name="api-key" id="api-key" value="" />
                </div>
                <div className="form-control half-input-line">
                  <label>
                    API Secret
                  </label>
                  <input type="text" name="api-secret" id="api-secret" value="" />
                </div>
            	</div>
            </div>
            <div className="right-side-form">
            	<div className="right-side-header">
            		<div>TRADE INFO</div>
            	</div>
            	<div className="right-side-info">
            		<div className="single-line">
            			<div className="title-line">
            				Number
            			</div>
            			<div className="data-line">
            				#4054879421
            			</div>
            		</div>
            		<div className="single-line">
            			<div className="title-line">
            				Name
            			</div>
            			<div className="data-line">
            				John Doe
            			</div>
            		</div>
                <div className="single-line">
                  <div className="title-line">
                    Email
                  </div>
                  <div className="data-line">
                    johndoe@company.com
                  </div>
                </div>
            	</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddExchange;
