import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = '6Lf2_ZcUAAAAABPs4V8oHiWZUW1pYQX2qwicFPXT';

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

  Captcha = (props) => (
    <div className="recaptcha">
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={props.input.onChange}
      />
      </div>
    );

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
            <Field name="email" type="email" component="input" autoComplete="none" className="email-input" placeholder="Correo Electrónico" />
            <Field name="password" type="password" component="input" autoComplete="none" placeholder="Contraseña" className="password-input" />
            <Field name='captcharesponse' component={this.Captcha}/>
            <input type="submit" name="submit" value="Ingresar" />
            <a href="#" className="reset-pass-link a-link">¿Olvidaste tu contraseña?</a>
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
