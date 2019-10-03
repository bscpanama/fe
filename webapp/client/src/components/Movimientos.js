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
        this.dateInputChange = this.dateInputChange.bind(this);

        this.state = {
            totalpages: 1,
            currentpage: 1,
            filterEstatusOpen: '',
            filterDateOpen: '',
            currentestatus: 'Todos',
            currentdate: 'Todo',
            currentestatusvalue: 'todos',
            currentdatevalue: 'todo',
            currentdaterangebegin: '',
            currentdaterangeend: '',
            buttondatedisabled: true
        };        
    }

	componentDidMount() {
	    document.title = "BS&C - Movimientos";
	    document.body.classList.remove('login');
        this.props.loadInvoices({page: 1});        
	}

    downloadPDF(invoiceId) {
        const url = `${SITE_URL}/pdfs/${invoiceId}`;
        const token = localStorage.getItem("bsctoken");
        const config = {
            headers: {
              'Authorization': token,
              'Accept': 'application/vnd.factura.v1+json',
            }
        };
        axios.get(url, config)
          .then(function (response) {
            console.log(response);
            window.open(response.data.pdf, '_blank');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    renderTable(invoice, index) {

    const valor_pago = invoice.attributes.valor_pago;
    const tipo_de_factura = [
        'Factura',
        'Factura',
        'Factura',
        'Nota Crédito',
        'Nota Débito',
        'Nota Crédito',
        'Nota Débito',
        'Factura',
        'Reembolso'
    ];
    const tiponum = parseInt(invoice.attributes.tipo_documento);

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
    return (
      <div className="t-row" key={index}>
            <div className="t-col">
                { invoice.attributes.fecha_de_emision }
            </div>
            <div className="t-col">
                    { invoice.attributes.cliente }
            </div>
            <div className="t-col">
                { invoice.attributes.numero_factura }
            </div>
            <div className="t-col">
                <span title={tipo_de_factura[tiponum-1]}>
                {tipo_de_factura[tiponum-1]}
                </span>
            </div>
            <div className="t-col cufe-no">
                <span className="small-number">{ invoice.attributes.cufe }</span>
            </div>
            <div className="t-col">
                { formatter.format(valor_pago) }
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
        currentestatusvalue: value,
        filterEstatusOpen: '',
        currentpage: 1
    });

    if(this.state.currentdaterangebegin != '' && this.state.currentdaterangeend != '') {
        this.props.loadInvoices({page: 1, status: value, datebegin: this.state.currentdaterangebegin, dateend: this.state.currentdaterangeend });
    } else {
        this.props.loadInvoices({page: 1, status: value, date: this.state.currentdatevalue });
    }
  }

  setFilterDate(value, label) {
    this.setState({
        currentdate: label,
        currentdatevalue: value,
        filterDateOpen: '',
        currentdaterangebegin: '',
        currentdaterangeend: '',
        currentpage: 1
    });
    this.props.loadInvoices({page: 1, status: this.state.currentestatusvalue, date: value });
  }

  setFilterDateRange() {
    this.setState({
        currentdate: this.state.currentdaterangebegin + ' - ' + this.state.currentdaterangeend,
        currentdatevalue: 'todo',
        filterDateOpen: '',
        currentdaterangebegin: '',
        currentdaterangeend: '',
        currentpage: 1,
        buttondatedisabled: true
    });
    this.props.loadInvoices({page: 1, status: this.state.currentestatusvalue, datebegin: this.state.currentdaterangebegin, dateend: this.state.currentdaterangeend });
  }

  dateInputChange(event) {
    if(event.target.value.length <= 10) {
        if(event.target.name == 'date-begin') {
            this.setState({
                currentdaterangebegin: event.target.value
            });
            if(event.target.value.length == 10 ){

                if(!event.target.value.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)){
                    this.setState({
                        currentdaterangebegin: ''
                    });
                } else {
                    if(this.state.currentdaterangeend.length == 10) {
                        this.setState({
                            buttondatedisabled: false
                        });
                    }
                }                
            }

            if(this.state.buttondatedisabled === false) {
                this.setState({
                    buttondatedisabled: true
                });
            }
        } else {
            this.setState({
                currentdaterangeend: event.target.value
            });
             if(event.target.value.length == 10 ){
                if(!event.target.value.match(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)){
                    this.setState({
                        currentdaterangeend: ''
                    });
                } else {
                    if(this.state.currentdaterangebegin.length == 10) {
                        this.setState({
                            buttondatedisabled: false
                        });
                    } 
                }                
            }
            if(this.state.buttondatedisabled === false) {
                this.setState({
                    buttondatedisabled: true
                });
            }           
        }
    }
  }

  render(){
    return (
    	<div>
        	<Sidebar />
        	<div className={'main-content ' + this.props.menustatus}>
        		<Header/>
        		<div className="main-container">
                    <div className="clearfix">
                        <div className="table movements">
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
                                            <li onClick={()=>this.setFilterDate('1', 'Hoy')}>Hoy</li>
                                            <li onClick={()=>this.setFilterDate('7', 'Hace 7 días')}>Hace 7 días</li>
                                            <li onClick={()=>this.setFilterDate('30', 'Hace Un Mes')}>Hace Un Mes</li>
                                            <li onClick={()=>this.setFilterDate('todo', 'Todo')}>Todo</li>
                                        </ul>
                                        <div className="date-range-form">
                                            <div className="date-wrapper">
                                            <label>Del</label>   
                                            <input type="text" name="date-begin" value={this.state.currentdaterangebegin} onChange={this.dateInputChange} className="date-begin" placeholder="ej. 2018-12-31" />
                                            </div>
                                            <div className="date-wrapper">
                                            <label>Al</label>    
                                            <input type="text" name="date-end" value={this.state.currentdaterangeend} onChange={this.dateInputChange} className="date-end" placeholder="ej. 2018-12-31" />
                                            </div>
                                            <button onClick={()=>this.setFilterDateRange()} disabled={this.state.buttondatedisabled}>Enviar</button>
                                        </div>                                
                                    </div>
                                </div>
                            </div>
                            <div className="t-header">
                                <div className="t-col">
                                    Fecha
                                </div>
                                <div className="t-col">
                                    Compa&ntilde;ia
                                </div>
                                <div className="t-col">
                                    Documento
                                </div>
                                <div className="t-col">
                                    Tipo de Documento
                                </div>
                                <div className="t-col">
                                    N# CUFE
                                </div>
                                <div className="t-col">
                                    Valor
                                </div>
                                <div className="t-col">
                                    Descarga
                                </div>
                            </div>
                            { this.props.invoices.hasOwnProperty('data') ? (this.props.invoices.data.length != 0 ? this.props.invoices.data.map(this.renderTable, this) : <div className="fullresult">No se encontraron resultados</div>) : <div className="fullresult">Cargando</div> }
                            
                        </div>
                    </div>
                    <div className="pagination">
                        <span className="prev-pag" onClick={(e) => this.previousPage(e)}>&lt;</span> <span className="counter-pages">Página { this.state.currentpage } - { this.props.invoices ? (this.props.invoices.meta[0].pages != 0 ? this.props.invoices.meta[0].pages : 1) : this.state.totalpages }</span> <span className="next-pag" onClick={(e) => this.nextPage(e)}>&gt;</span>
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
