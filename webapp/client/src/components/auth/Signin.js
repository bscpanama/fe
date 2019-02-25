import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

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
            <Field name="email" type="email" component="input" autoComplete="none" className="email-input" placeholder="Correo Electrónico" />
            <Field name="password" type="password" component="input" autoComplete="none" placeholder="Contraseña" className="password-input" />
            <a href="#" className="reset-pass-link a-link">¿Olvidaste tu contraseña?</a>
            <input type="submit" name="submit" value="Ingresar" />
            <div className="error-messages"></div> 
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SignIn);
