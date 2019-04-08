import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

import { AUTH_ERROR } from '../../actions/types';

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

class SignIn extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      errorMessage: ''
    }
  }

  componentDidMount() {
    document.title = "BS&C - Login";
    document.body.classList.add('login');
    
  }

  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ errorMessage: nextProps.errorMessage });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: AUTH_ERROR,
      payload: ''
    });
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  
  render() {
    const { handleSubmit, submitting } = this.props;    

    return (
      <div>
        <div className="login-box">
          <div className="login-head">
            <img src="/assets/logo.png" alt="BS&C Logo" />
          </div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <h2>Bienvenido</h2>
            <Field name="email" type="email" component={renderField} className="email-input" validate={[required, email]} label="Correo Electrónico" />
            <Field name="password" type="password" component={renderField} className="password-input" validate={required} label="Contraseña" />
            <input type="submit" name="submit" value="Ingresar" disabled={submitting} />
            <div className="reset-pass-link">
              <Link to="recuperar">¿Olvidaste tu contraseña?</Link>
            </div>
            {this.state.errorMessage ?<div className="error-messages">{this.state.errorMessage}</div> : '' }
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  const { errorMessage } = auth;
  return { errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SignIn);
