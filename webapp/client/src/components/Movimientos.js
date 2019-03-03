import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';

import { loadInvoices } from '../actions/index.js';

class Movimientos extends Component {
    constructor(props) {
        super(props);
    }

	componentDidMount() {
	    document.title = "BS&C - Movimientos";
	    document.body.classList.remove('login');
        this.props.loadInvoices();
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
            </div>
            <div className="t-col">
                <a className="action-pdf actions" href={'/pdfs/'+invoice.id} ></a>
                <a className="action-xml actions" href="#" ></a>
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
                        <div className="table">
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
                                    N&deg; de Factura
                                </div>
                                <div className="t-col">
                                    Tipo
                                </div>
                                <div className="t-col">
                                    Date
                                </div>
                                <div className="t-col">
                                    Estatus
                                </div>
                                <div className="t-col">
                                    Descarga
                                </div>
                            </div>
                            { this.props.invoices.data ? this.props.invoices.data.map(this.renderTable) : <div>Cargando</div> }
                            
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
  return bindActionCreators({ loadInvoices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Movimientos));
