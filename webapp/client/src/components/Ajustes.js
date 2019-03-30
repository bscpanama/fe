import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';

import { updateSettings } from '../actions/index.js';

class Ajustes extends Component {
	componentDidMount() {
	    document.title = "BS&C - Ajustes";
	    document.body.classList.remove('login');
	}

    onSubmit = formProps => {
        this.props.updateSettings(formProps);
    };

    render(){
        const { handleSubmit } = this.props;

        return (
        	<div>
            	<Sidebar />
            	<div className={'main-content ' + this.props.menustatus}>
            		<Header/>             
            		<div className="main-container">
                        <div className="clearfix">
                            <h2>Ajustes</h2>
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <div className="form-container clearfix">
                                <div className="inside-form-container">
                                  <div className="form-full">
                                    <div className="input-wrapper">
                                      <label>Contraseña</label>
                                      <Field name="password" type="password" component="input" autoComplete="none" />
                                    </div>
                                    <div className="input-wrapper">
                                      <label>Confirmar Contraseña</label>
                                      <Field name="passwordconfirmation" type="password" component="input" autoComplete="none" />
                                    </div>                                    
                                  </div>
                                </div>
                                </div>
                                <div className="form-actions">
                                  <input type="submit" name="submit" value="Actualizar" />
                                </div>
                              </form>
                              {this.props.settings_updated_message ? <div className="messageupdate"> + this.props.settings_updated_message + </div> : ''}
                        </div>
                    </div>
                </div>
            </div>     	    
        );
    }
}


function mapStateToProps({ movements }) {
    const { menustatus } = movements;

    return { menustatus };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateSettings }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ 
    form: 'updateSettings'
 })
)(requireAuth(Ajustes));
