import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';

import { updateSettings } from '../actions/index.js';
import { SETTINGS_UPDATE_ERROR } from '../actions/types';

const required = value => value ? undefined : 'Requerido';
const passwordsMustMatch = (value, allValues) => 
  value !== allValues.password ? 
    'Las contraseñas no coinciden' :
     undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="input-wrapper">
    <label>{label}</label>
    <div>
      <input {...input} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class Ajustes extends Component {

	componentDidMount() {
	    document.title = "BS&C - Ajustes";
	    document.body.classList.remove('login');
	}

  componentWillUnmount() {
    this.props.dispatch({
      type: SETTINGS_UPDATE_ERROR,
      payload: ''
    });
  }
    onSubmit = formProps => {
        this.props.updateSettings(formProps);
    };

    render(){
        const { handleSubmit, submitting, pristine, invalid } = this.props;

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
                                    <Field name="password" type="password"
                                      component={renderField} label="Contraseña"
                                      validate={required}
                                    />
                                    <Field name="passwordconfirmation" type="password"
                                      component={renderField} label="Confirmar Contraseña"
                                      validate={[required, passwordsMustMatch]}
                                    />                                  
                                  </div>
                                </div>
                                </div>
                                <div className="form-actions">
                                  <input type="submit" name="submit" value="Actualizar" disabled={submitting || invalid || pristine } />
                                </div>
                              </form>
                              {this.props.settings_updated_message ? <div className="messageupdate"> { this.props.settings_updated_message } </div> : ''}
                              {this.props.settingsUpdateErrorMessage !== '' ? <div className="error-message-form"> { this.props.settingsUpdateErrorMessage === 'Network Error' ? 'Ha habido un error. por favor intenta otra vez o intenta más tarde.' : this.props.settingsUpdateErrorMessage } </div> : '' }

                        </div>
                    </div>
                </div>
            </div>     	    
        );
    }
}


function mapStateToProps({ movements }) {
    const { menustatus, settingsUpdateErrorMessage, settings_updated_message } = movements;

    return { menustatus, settings_updated_message, settingsUpdateErrorMessage };
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
