import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';


class Movimientos extends Component {
	componentDidMount() {
	    document.title = "BS&C - Movimientos";
	    document.body.classList.remove('login');
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
                            <div className="t-row">
                                <div className="t-col">
                                    EMPRESA A                      
                                </div>
                                <div className="t-col">
                                    72420502                        
                                </div>
                                <div className="t-col">
                                    Factura                       
                                </div>
                                <div className="t-col">
                                    17/02/2017                       
                                </div>
                                <div className="t-col">
                                    <span className="active">Activo</span>                        
                                </div>
                                <div className="t-col">
                                    <div className="action-pdf actions"></div>
                                    <div className="action-xml actions"></div>                    
                                </div>
                            </div>
                            <div className="t-row alt">
                                <div className="t-col">
                                    EMPRESA B                      
                                </div>
                                <div className="t-col">
                                    72420502                        
                                </div>
                                <div className="t-col">
                                    Factura                       
                                </div>
                                <div className="t-col">
                                    17/02/2017                       
                                </div>
                                <div className="t-col">
                                    <span className="active">Activo</span>                     
                                </div>
                                <div className="t-col">
                                    <div className="action-pdf actions"></div>
                                    <div className="action-xml actions"></div>                    
                                </div>
                            </div>
                            <div className="t-row">
                                <div className="t-col">
                                    EMPRESA C                      
                                </div>
                                <div className="t-col">
                                    72420502                        
                                </div>
                                <div className="t-col">
                                    Factura                       
                                </div>
                                <div className="t-col">
                                    17/02/2017                       
                                </div>
                                <div className="t-col">
                                    <span className="not-active">Anulado</span>                        
                                </div>
                                <div className="t-col">
                                    <div className="action-pdf actions"></div>
                                    <div className="action-xml actions"></div>                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}

export default requireAuth(Movimientos);
