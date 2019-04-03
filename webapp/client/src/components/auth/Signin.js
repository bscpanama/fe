import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Correo Invalido' : undefined;
const tooOld = value =>
  value && value > 65 ? 'You might be too old for this' : undefined;
const aol = value =>
  value && /.+@aol\.com/.test(value) ?
  'Really? You still use AOL for your email?' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class SignIn extends Component {
  componentDidMount() {
    document.title = "BS&C - Login";
    document.body.classList.add('login');

    
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  
  render() {
    const { handleSubmit } = this.props;    

    return (
      <div>
        <div className="login-box">
          <div className="login-head">
            <img src="/assets/logo.png" alt="BS&C Logo" />
          </div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <h2>Bienvenido</h2>
            <Field name="email" type="email" component={renderField} className="email-input" validate={[required, email]} label="Correo Electrónico" />
            <Field name="password" type="password" component="input" autoComplete="none" placeholder="Contraseña" className="password-input" />
            <input type="submit" name="submit" value="Ingresar" />
            <div className="reset-pass-link">
              <Link to="recuperar">¿Olvidaste tu contraseña?</Link>
            </div>
            <div className="error-messages">{this.props.errorMessage}</div> 
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
