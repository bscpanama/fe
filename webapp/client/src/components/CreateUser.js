import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import * as actions from '../actions'
import { CREATE_USER_ERROR } from '../actions/types';


const required = value => value ? undefined : 'Requerido';
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const number = value => value && isNaN(Number(value)) ? 'Debe ser un numero' : undefined;
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Formato de correo invalido' : undefined;

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className="input-wrapper">
    <label>{label}</label>
    <div>
      <input {...input} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class CreateUser extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      preview: '',
      errorMessage: ''
    }
  }

	componentDidMount() {
	    document.title = "BS&C - Crear Usuario";
	    document.body.classList.remove('login');
	}

  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ errorMessage: nextProps.userCreateErrorMessage });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: CREATE_USER_ERROR,
      payload: ''
    });
  }

  onSubmit = formProps => {
    this.props.createUserAccount(formProps, () => {
      this.props.history.push('/usuarios');
    });
  };

  adaptFileEventToValue = delegate => e => {
      if(e.target.files[0]){
        this.setState({
         preview: URL.createObjectURL(e.target.files[0])     
        });
      }

      delegate(e.target.files[0]); 
  }

  FileInput = ({ 
      input: { value: omitValue, onChange, onBlur, ...inputProps }, 
      meta: omitMeta, 
      ...props 
    }) => {
      return (
        <input
          onChange={this.adaptFileEventToValue(onChange)}
          onBlur={this.adaptFileEventToValue(onBlur)}
          type="file"
          id="avatar"
          accept="image/*"
          {...props.input}
          {...props}
        />
      );
  };


  render(){

    let imagePreview = {
      backgroundImage: `url(${this.state.preview})`
    };

    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
    	<div>
        	<Sidebar />
        	<div className={'main-content ' + this.props.menustatus}>
        		<Header/>             
        		<div className="main-container">
                    <div className="clearfix">
                        <form onSubmit={handleSubmit(this.onSubmit)}>
                        <div className="form-container clearfix">
                        <h3>Nuevo Usuario</h3>
                        <div className="inside-form-container">
                          <div className="form-left">
                            <Field name="avatar" type="file" component={this.FileInput}/>
                            <label htmlFor="avatar" className="avatar-file" style={imagePreview}></label>
                            <label>Logo</label>
                          </div>
                          <div className="form-right">
                            <Field name="email" type="email"
                              component={renderField} label="Email"
                              validate={[required, email]}
                            />
                            <Field name="name" type="text"
                              component={renderField} label="Nombre"
                              validate={required}
                            />
                            <Field name="lastname" type="text"
                              component={renderField} label="Apellido"
                              validate={required}
                            />
                            <Field name="company" type="text"
                              component={renderField} label="Compañía"
                              validate={required}
                            />
                            <Field name="phone" type="text"
                              component={renderField} label="Teléfono"
                              validate={[required, number]}
                            />
                            <Field name="mobile" type="text"
                              component={renderField} label="Celular"
                              validate={[required, number]}
                            />
                            <div className="input-wrapper">
                              <label>Planes</label>
                              <Field name="plans" component="select">
                                <option value="1" defaultValue>1 mes</option>
                                <option value="2">3 meses</option>
                                <option value="3">6 meses</option>
                                <option value="4">1 año</option>
                              </Field>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="form-actions">
                          <input type="submit" name="submit" value="Crear usuario" disabled={submitting || invalid || pristine } />
                          <Link to="/usuarios">Cancelar</Link>
                        </div>
                      </form>
                      {this.state.errorMessage != '' ? <div className="error-message-form"> { this.state.errorMessage == 'Network Error' ? 'Ha habido un error. por favor intenta otra vez o intenta más tarde.' : this.state.errorMessage } </div> : '' }
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}


function mapStateToProps({ movements }) {
    const { menustatus, userCreateErrorMessage } = movements;
    const initialValues = {
      plans: 1,
    };
    return { menustatus, userCreateErrorMessage, initialValues };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'createUserAccount' })
)(requireAuth(CreateUser));