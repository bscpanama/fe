import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import { loadUsers } from '../actions/index.js';


class Usuarios extends Component {
	componentDidMount() {
	    document.title = "BS&C - Usuarios";
	    document.body.classList.remove('login');

        this.props.loadUsers();
	}

    renderTable(user, index) {
        return (
          <div className="t-row" key={index}>
                <div className="t-col">
                        { user.attributes.email }
                </div>
                <div className="t-col">
                    { user.attributes.account ? user.attributes.account.name : ''}
                </div>
                <div className="t-col">
                    { user.attributes.account ? user.attributes.account.last_name : ''}
                </div>
                <div className="t-col">
                    { user.attributes.account ? (user.attributes.account.company ? user.attributes.account.company : 'N/A') : 'N/A'}
                </div>
                <div className="t-col">
                   <span className={user.attributes.account.status == "activo" ? 'active' : 'not-active'}>{ user.attributes.account ? (user.attributes.account.status == "activo" ?'Activo' : 'Inactivo') : ''}</span><Link to={'modificarusuario/'+user.id}>editar</Link>
                </div>
          </div>
        );
      }

  render(){
    return (
    	<div>
        	<Sidebar />
        	<div className={'main-content ' + this.props.menustatus}>
        		<Header/>             
        		<div className="main-container">
                    <div className="clearfix">
                        <div className="action-button">
                            <Link to="/crearusuario" >+ Crear Usuario</Link>
                        </div>
                        <div className="table table-users">
                            <div className="filter">
                                <select>
                                    <option value="status">Estatus</option>
                                </select>
                                <select>
                                    <option value="last-30">Últimos 30 días</option>
                                </select>
                            </div>
                            <div className="t-header">
                                <div className="t-col">
                                    Usuario
                                </div>
                                <div className="t-col">
                                    Nombre
                                </div>
                                <div className="t-col">
                                    Apellido
                                </div>
                                <div className="t-col">
                                    Compañia
                                </div>
                                <div className="t-col">
                                    Estatus
                                </div>
                            </div>
                            { this.props.users.data ? this.props.users.data.map(this.renderTable, this) : <div>Cargando</div> }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}


function mapStateToProps({ movements }) {
    const { users, menustatus } = movements;
    return { users, menustatus };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Usuarios));
