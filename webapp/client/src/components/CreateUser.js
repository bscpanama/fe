import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import * as actions from '../actions'

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({ 
  input: { value: omitValue, onChange, onBlur, ...inputProps }, 
  meta: omitMeta, 
  ...props 
}) => {
  return (
    <input
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />
  );
};

class CreateUser extends Component {
	componentDidMount() {
	    document.title = "BS&C - Crea Usuario";
	    document.body.classList.remove('login');
	}

  onSubmit = formProps => {
    this.props.createUserAcount(formProps, () => {
      this.props.history.push('/usuarios');
    });
  };

  render(){
    const { handleSubmit } = this.props;
    return (
    	<div>
        	<Sidebar />
        	<div className={'main-content ' + this.props.menustatus}>
        		<Header/>             
        		<div className="main-container">
                    <div className="clearfix">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                        <Field name="avatar" type="file" component={FileInput}/>
                        <Field name="email" type="email" component="input" autoComplete="none" />
                        <Field name="name" type="text" component="input" autoComplete="none" />
                        <Field name="lastname" type="text" component="input" autoComplete="none" />
                        <Field name="company" type="text" component="input" autoComplete="none" />
                        <Field name="phone" type="text" component="input" autoComplete="none" />
                        <Field name="mobile" type="text" component="input" autoComplete="none" />
                        <Field name="password" type="password" component="input" autoComplete="none" />
                        <Field name="confirmpassword" type="password" component="input" autoComplete="none" />
                        <Field name="plans" component="select">
                          <option value="1">1 mes</option>
                          <option value="2">3 meses</option>
                          <option value="3">6 meses</option>
                          <option value="4">1 año</option>
                        </Field>
                        <input type="submit" name="submit" value="Crear usuario" />
                        <Link to="/usuarios" />
                      </form>
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}


function mapStateToProps({ movements }) {
    const { menustatus } = movements;
    return { menustatus };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'createUserAcount' })
)(requireAuth(CreateUser));