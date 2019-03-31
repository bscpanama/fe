import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

import { loadUsers } from '../actions/index.js';


class Usuarios extends Component {
    constructor(props) {
        super(props);

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
	    document.title = "BS&C - Usuarios";
	    document.body.classList.remove('login');

        this.props.loadUsers({page: 1});
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


    previousPage(e) {
    e.stopPropagation();
    if(this.state.currentpage != 1) {
        this.setState((state) => ({
            currentpage: state.currentpage - 1
        }));

        this.props.loadUsers({page: this.state.currentpage-1}); 
    }
  }

  nextPage(e) {
    e.stopPropagation();
    if(this.state.currentpage < this.props.users.meta[0].pages) {
        this.setState((state) => ({
            currentpage: state.currentpage + 1
        }));
        this.props.loadUsers({page: this.state.currentpage+1});
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
        this.props.loadUsers({page: 1, status: value, datebegin: this.state.currentdaterangebegin, dateend: this.state.currentdaterangeend });
    } else {
        this.props.loadUsers({page: 1, status: value, date: this.state.currentdatevalue });
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
    this.props.loadUsers({page: 1, status: this.state.currentestatusvalue, date: value });
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
    this.props.loadUsers({page: 1, status: this.state.currentestatusvalue, datebegin: this.state.currentdaterangebegin, dateend: this.state.currentdaterangeend });
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
                        <div className="action-button">
                            <Link to="/crearusuario" >+ Crear Usuario</Link>
                        </div>
                        <div className="table table-users">
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
                            { this.props.users.data ?  (this.props.users.data.length != 0 ? this.props.users.data.map(this.renderTable, this) : <div className="fullresult">No se encontraron resultados</div>) : <div>Cargando</div> }
                            
                        </div>
                    </div>
                    <div className="pagination">
                        <span className="prev-pag" onClick={(e) => this.previousPage(e)}>&lt;</span> <span className="counter-pages">Página { this.state.currentpage } - { this.props.users ? (this.props.users.meta[0].pages != 0 ? this.props.users.meta[0].pages : 1) : this.state.totalpages }</span> <span className="next-pag" onClick={(e) => this.nextPage(e)}>&gt;</span>
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
