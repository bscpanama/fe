import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import axios from 'axios';

import { loadInvoices, SITE_URL } from '../actions/index.js';

class Movimientos extends Component {
    constructor(props) {
        super(props);

        this.downloadPDF = this.downloadPDF.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.estatusFilterToggle = this.estatusFilterToggle.bind(this);
        this.dateFilterToggle = this.dateFilterToggle.bind(this);
        this.setFilterEstatus = this.setFilterEstatus.bind(this);
        this.setFilterDate = this.setFilterDate.bind(this);
        this.setFilterDateRange = this.setFilterDateRange.bind(this);
        this.setFilterDateYear = this.setFilterDateYear.bind(this);

        this.state = {
            totalpages: 1,
            currentpage: 1,
            filterEstatusOpen: '',
            filterDateOpen: '',
            currentestatus: 'Todos',
            currentdate: 'Últimos 30 días'
        };        
    }

	componentDidMount() {
	    document.title = "BS&C - Movimientos";
	    document.body.classList.remove('login');
        this.props.loadInvoices({page: 1});        
	}

    downloadPDF(invoiceId) {
        const url = `${SITE_URL}/pdfs/${invoiceId}`;
        const token = localStorage.getItem("token");
        const config = {
            headers: {
              'Authorization': token,
              'Accept': 'application/vnd.factura.v1+json',
            }
        };
        axios.get(url, config)
          .then(function (response) {
            window.open(response.data.pdf, '_blank');
          })
          .catch(function (error) {
            console.log(error);
          });
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
                <span className={ invoice.attributes.status == 'activo' ? 'active' : 'not-active' } >{ invoice.attributes.status }</span>
            </div>
            <div className="t-col">
                <div className="action-pdf actions" onClick={() => this.downloadPDF(invoice.id)}></div>
                <div className="action-xml actions" onClick={() => window.open(SITE_URL + invoice.attributes.xml_url, '_blank')}></div>
            </div>
      </div>
    );
  }

  previousPage(e) {
    e.stopPropagation();
    if(this.state.currentpage != 1) {
        this.setState((state) => ({
            currentpage: state.currentpage - 1
        }));

        this.props.loadInvoices({page: this.state.currentpage-1}); 
    }
  }

  nextPage(e) {
    e.stopPropagation();
    if(this.state.currentpage < this.props.invoices.meta[0].pages) {
        this.setState((state) => ({
            currentpage: state.currentpage + 1
        }));
        this.props.loadInvoices({page: this.state.currentpage+1});
    }
  }

  estatusFilterToggle() {
    if(this.state.filterEstatusOpen == '') {
        this.setState({
            filterEstatusOpen: 'open'
        });
    } else {
        this.setState({
            filterEstatusOpen: ''
        });
    }
  }

  dateFilterToggle() {
    if(this.state.filterDateOpen == '') {
        this.setState({
            filterDateOpen: 'open'
        });
    } else {
        this.setState({
            filterDateOpen: ''
        });
    }
  }

  setFilterEstatus(value, label) {
    this.setState({
        currentestatus: label,
        filterEstatusOpen: '',
        currentpage: 1
    });
    this.props.loadInvoices({page: 1, status: value });
  }

  setFilterDate(value, label) {
    this.setState({
        currentdate: label,
        filterDateOpen: '',
        currentpage: 1
    });

  }

  setFilterDateYear() {

  }

  setFilterDateRange() {

  }

  render(){
    console.log(this.props.invoices);
    return (
    	<div>
        	<Sidebar />
        	<div className={'main-content ' + this.props.menustatus}>
        		<Header/>
        		<div className="main-container">
                    <div className="clearfix">
                        <div className="table">
                            <div className="filter">
                                <div className={'filter-box estatus ' + this.state.filterEstatusOpen}>
                                    <div className="current-option" onClick={()=>this.estatusFilterToggle()}>{this.state.currentestatus}</div>
                                    <div className="options-container">
                                        <ul>
                                            <li onClick={()=>this.setFilterEstatus('activo', 'Activos')}>Activos</li>
                                            <li onClick={()=>this.setFilterEstatus('inactivo', 'Inactivos')}>Inactivos</li>
                                            <li onClick={()=>this.setFilterEstatus('todos', 'Todos')}>Todos</li>
                                        </ul>
                                    </div>                            
                                </div>
                                <div className={'filter-box date ' + this.state.filterDateOpen}>
                                    <div className="current-option" onClick={()=>this.dateFilterToggle()}>{this.state.currentdate}</div>
                                    <div className="options-container">
                                        <ul>
                                            <li onClick={()=>this.setFilterDate('30', 'Últimos 30 días')}>Últimos 30 días</li>
                                            <li onClick={()=>this.setFilterDate('90', 'Últimos 90 días')}>Últimos 90 días</li>
                                            <li>2019</li>
                                            <li>2018</li>
                                        </ul>
                                        <div className="date-range-form">
                                            <div className="date-wrapper">
                                            <label>Del</label>   
                                            <input type="text" name="date-begin" className="date-begin" placeholder="ej. 12/31/2018" />
                                            </div>
                                            <div className="date-wrapper">
                                            <label>Al</label>    
                                            <input type="text" name="date-end" className="date-end" placeholder="ej. 12/31/2018" />
                                            </div>
                                            <button>Enviar</button>
                                        </div>                                
                                    </div>
                                </div>
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
                            { this.props.invoices.hasOwnProperty('data') ? (this.props.invoices.data.length != 0 ? this.props.invoices.data.map(this.renderTable, this) : <div className="fullresult">No se encontraron resultados</div>) : <div className="fullresult">Cargando</div> }
                            
                        </div>
                    </div>
                    <div className="pagination">
                        <span className="prev-pag" onClick={(e) => this.previousPage(e)}>&lt;</span> <span className="counter-pages">Página { this.state.currentpage } - { this.props.invoices ? this.props.invoices.meta[0].pages : this.state.totalpages }</span> <span className="next-pag" onClick={(e) => this.nextPage(e)}>&gt;</span>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps({ movements }) {
    const { invoices, menustatus } = movements;
    return { invoices, menustatus };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadInvoices }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Movimientos));
