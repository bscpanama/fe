import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import { loadUser, modifyUserAccount, SITE_URL } from '../actions/index.js';
import { MODIFY_USER_ERROR } from '../actions/types';

const required = value => value ? undefined : 'Requerido';
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const number = value => value && isNaN(Number(value)) ? 'Debe ser un numero' : undefined;
const minValue = min => value =>
  value && value < min ? `Debe ser almenos ${min}` : undefined;
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

class ModifyUser extends Component {
  constructor(props){
    super(props);

    this.state = {
      preview: '',
      userModifyErrorMessage: ''
    }
  }

	componentDidMount() {
	    document.title = "BS&C - Modificar Usuario";
	    document.body.classList.remove('login');
      
      
      this.props.loadUser(this.props.match.params.id);
	}

  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ userModifyErrorMessage: nextProps.userModifyErrorMessage });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: MODIFY_USER_ERROR,
      payload: ''
    });
  }
  
  onSubmit = formProps => {
    this.props.modifyUserAccount(formProps, () => {
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
    let previewImg = '';
    if(typeof this.props.user.data !== 'undefined' && this.state.preview == '') {
      if(this.props.user.data.attributes.account.avatar_url != null ) {
        previewImg = SITE_URL + this.props.user.data.attributes.account.avatar_url;
      }
    } else {
      previewImg = this.state.preview;
    }

    let imagePreview = {
      backgroundImage: `url(${previewImg})`
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
                        <h3>Modifcar Usuario</h3>
                        <div className="inside-form-container">
                          <div className="form-left">
                            <Field name="avatar" type="file" component={this.FileInput}/>
                            <label htmlFor="avatar" className="avatar-file" style={imagePreview}></label>
                            <label>Avatar</label>
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
                                <option value="1">1 mes</option>
                                <option value="2">3 meses</option>
                                <option value="3">6 meses</option>
                                <option value="4">1 año</option>
                              </Field>
                            </div>
                            <div className="input-wrapper">
                              <label>Estatus</label>
                              <Field name="status" component="select">
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactive</option>
                              </Field>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="form-actions">
                          <input type="submit" name="submit" value="Modificar usuario" disabled={submitting || invalid || pristine } />
                          <Link to="/usuarios">Cancelar</Link>
                        </div>
                      </form>
                      {this.state.userModifyErrorMessage != '' ? <div className="error-message-form"> { this.state.userModifyErrorMessage == 'Network Error' ? 'Ha habido un error. por favor intenta otra vez o intenta más tarde.' : this.state.errorMessage } </div> : '' }
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}


function mapStateToProps({ movements }) {
    const { menustatus, user, userModifyErrorMessage } = movements;
    const initialValues = {
      id: user ? user.data.id : '',
      email: user ? user.data.attributes.email : '',
      name: user ? user.data.attributes.account.name : '',
      lastname: user ? user.data.attributes.account.last_name : '',
      company: user ? user.data.attributes.account.company : '',
      phone: user ? user.data.attributes.account.phone_number : '',
      mobile:  user ? user.data.attributes.account.mobile_number : '',
      plans: user ? (user.data.attributes.account.plan_id != null ? user.data.attributes.account.plan_id : 1) : 1,
      status: user ? user.data.attributes.account.status : 'activo',
      account_id: user ? user.data.attributes.account.id : ''
    };

    return { menustatus, user, userModifyErrorMessage, initialValues  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadUser, modifyUserAccount }, dispatch);
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ 
    form: 'modifyUserAccount',
    enableReinitialize: true
 })
)(requireAuth(ModifyUser));