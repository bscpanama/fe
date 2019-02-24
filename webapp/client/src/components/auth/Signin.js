import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  componentDidMount() {
    document.title = "CryptoVAC - Sign In";
  }

  onSubmit = formProps => {
    this.props.signin(formProps, () => {
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
               Sign In
             </h1>
          	<form onSubmit={handleSubmit(this.onSubmit)}>
              <Field name="email" type="email" component="input" autoComplete="none" placeholder="Email Addresss" />
              <Field name="password" type="password" component="input" autoComplete="none" placeholder="Password" className="input-line input-full input-search" />
        		  <input type="submit" name="send"  className="signup-button" value="Sign In" />
          	</form>
            <div className="create-loss">
          		<a href="#">Forgot my password</a>
          	</div>
          </div>
          <div className="signup-now">
             <h2>Don&#39;t have an account?</h2>
             <Link to="/signup" className="signup-button">Sign up now</Link>
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
