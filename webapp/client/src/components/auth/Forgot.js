import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import { FORGOT_PASSWORD_RESET_ERROR } from '../../actions/types';

const required = value => value ? undefined : 'Requerido';
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Correo Invalido' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className="input-wrapper-login">
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span className="error-input">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class Forgot extends Component {
  
  componentDidMount() {
    document.title = "BS&C - Recuperar Constraseña";
    document.body.classList.add('login');
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: FORGOT_PASSWORD_RESET_ERROR,
      payload: ''
    });
  }

  onSubmit = formProps => {
    this.props.forgot(formProps);
  };

  render() {
    const { handleSubmit, submitting, pristine, invalid, reset } = this.props;
    if(this.props.forgotMessage) {
      reset('forgot');
    }
    return (
      <div>
        <div className="login-box">
          <div className="login-head">
            <img src="/assets/logo.png" alt="BS&C Logo" />
          </div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <h2>Recuperar Contraseña</h2>
            <Field name="email" type="email" component={renderField} className="email-input" validate={[required, email]} label="Correo Electrónico" />
            <input type="submit" name="submit" value="Enviar" disabled={submitting || invalid || pristine } />
            <div className="reset-pass-link">
              <Link to="/">Regresar</Link>
            </div>
            {this.props.forgotMessageError ?<div className="error-messages">{this.props.forgotMessageError}</div> : '' }
            { this.props.forgotMessage ? <div className="success-messages">  {this.props.forgotMessage} </div>  : '' }
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({movements}) {
  const { forgotMessage, forgotMessageError } = movements;
  return { forgotMessage, forgotMessageError };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'forgot' })
)(Forgot);
