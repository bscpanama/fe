import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class Forgot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "BS&C - Recuperar Constraseña";
    document.body.classList.add('login');
  }

  onSubmit = formProps => {
    this.props.forgot(formProps);
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
            <h2>Recuperar Contraseña</h2>
            <Field name="email" type="email" component="input" autoComplete="none" className="email-input" placeholder="Correo Electrónico" />
            <input type="submit" name="submit" value="Enviar" />
            <div className="reset-pass-link">
              <Link to="/">Regresar</Link>
            </div>
            <div className="success-messages">
            { this.props.forgotMessage ?  this.props.forgotMessage  : '' }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({movements}) {
  const { forgotMessage } = movements;
  return { forgotMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'forgot' })
)(Forgot);
