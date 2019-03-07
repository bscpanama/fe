import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';


import { loadUsers } from '../actions/index.js';


class Usuarios extends Component {
	componentDidMount() {
	    document.title = "BS&C - Usuarios";
	    document.body.classList.remove('login');
	}

    renderTable(invoice, index) {
        return (
          <div className="t-row" key={index}>
                <div className="t-col">
                        { invoice.attributes.cliente }
                </div>
                <div className="t-col">
                    { invoice.attributes.numero_factura }
                </div>
                <div className="t-col">
                    { invoice.attributes.tipo_documento == '01' ? 'Factura' : 'Documento' }
                </div>
                <div className="t-col">
                    { invoice.attributes.fecha_de_emision }
                </div>
                <div className="t-col">
                    <span className={ invoice.attributes.status == 'ACTIVO' ? 'active' : 'not-active' } >{ invoice.attributes.status }</span>
                    <div className="action-edit actions"></div>
                    <div className="action-delete actions"></div>
                </div>
          </div>
        );
      }

  render(){
    return (
    	<div>
        	<Sidebar />
        	<div className="main-content">
        		<Header/>             
        		<div className="main-container">
                    <div className="clearfix">
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
                            { this.props.invoices.data ? this.props.invoices.data.map(this.renderTable, this) : <div>Cargando</div> }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}


function mapStateToProps({ movements }) {
    const { invoices } = movements;
    return { invoices };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadUsers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Usuarios));
