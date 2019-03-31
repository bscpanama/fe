import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class Reset extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "BS&C - Cambiar Constraseña";
    document.body.classList.add('login');

  }

  onSubmit = formProps => {
    this.props.resetPass(formProps);
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
            <h2>Cambiar Contraseña</h2>
            <Field name="password" type="password" component="input" autoComplete="none" className="email-input" placeholder="Contraseña" />
            <Field name="password_confirmation" type="password" component="input" autoComplete="none" className="email-input" placeholder="Confirmar Contraseña" />
            <input type="submit" name="submit" value="Enviar" />
            <div className="reset-pass-link">
              <Link to="/">Ingresar</Link>
            </div>
            <div className="success-messages">
            { this.props.resetMessage ?  this.props.resetMessage  : '' }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({movements}, ownProps) {
  const { resetMessage } = movements;
  const webtoken = ownProps.location.search.split("?token=");

  const initialValues = {
      token: webtoken[1],
  };
  return { resetMessage, initialValues };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'resetPass',
  enableReinitialize: true })
)(Reset);
