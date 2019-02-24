import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {
  componentDidMount() {
    document.title = "CryptoVAC - Sign Up";
  }

  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="top-100x">
          <img src="/assets/cryptovac-logo-form.svg" alt="CryptoVAC Logo" className="form-logo"/>
        </div>
         <div className="login-box">
             <h1 className="text-center">
               Sign up
             </h1>
          	<form onSubmit={handleSubmit(this.onSubmit)}>
              <Field name="name" type="text" component="input" autoComplete="none" placeholder="Name" />
              <Field name="email" type="email" component="input" autoComplete="none" placeholder="Email Addresss" />
              <Field name="password" type="password" component="input" autoComplete="none" placeholder="Password" className="input-line input-full input-search" />
              <Field name="confirm_password" type="password" component="input" autoComplete="none" placeholder="Confirm Password" className="input-line input-full input-search" />
          		<label className="checkbox-label">I agree to the <a href="#">terms of services</a>
          		 	 <input type="checkbox" name="accept-terms" value="yes" />
          	     <span className="checkmark fa"></span>
              </label>
        		<input type="submit" name="send"  className="signup-button" value="Sign Up" />
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
  reduxForm({ form: 'signup' })
)(SignUp);
