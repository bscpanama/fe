import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import * as actions from '../actions'


class ModifyUser extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      preview: ''
    }
  }

	componentDidMount() {
	    document.title = "BS&C - Modificar Usuario";
	    document.body.classList.remove('login');
	}

  onSubmit = formProps => {
    this.props.ModifyUserAcount(formProps, () => {
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
          {...props.input}
          {...props}
        />
      );
    };

  render(){

    let imagePreview = {
      backgroundImage: `url(${this.state.preview})`
    };

    const { handleSubmit } = this.props;
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
                            <label>Avatar</label>
                          </div>
                          <div className="form-right">
                            <div className="input-wrapper">
                              <label>Correo Electrónico</label>
                              <Field name="email" type="email" component="input" autoComplete="none" />
                            </div>
                            <div className="input-wrapper">
                              <label>Nombre</label>
                              <Field name="name" type="text" component="input" autoComplete="none" />
                            </div>
                            <div className="input-wrapper">
                              <label>Apellido</label>
                              <Field name="lastname" type="text" component="input" autoComplete="none" />
                            </div>
                            <div className="input-wrapper">
                              <label>Compañía</label>
                              <Field name="company" type="text" component="input" autoComplete="none" />
                            </div>
                            <div className="input-wrapper">
                              <label>Teléfono</label>
                              <Field name="phone" type="tel" component="input" autoComplete="none" />
                            </div>
                            <div className="input-wrapper">
                              <label>Celular</label>
                              <Field name="mobile" type="text" component="input" autoComplete="none" />
                            </div>
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
                          <input type="submit" name="submit" value="Crear usuario" />
                          <Link to="/usuarios">Cancelar</Link>
                        </div>
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
  reduxForm({ form: 'ModifyUserAcount' })
)(requireAuth(ModifyUser));