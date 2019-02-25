import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';


class Dashboard extends Component {
	componentDidMount() {
	    document.title = "BS&C - Dashboard";
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
                <div className="activity-table">
                    <div className="t-header">
                        <div className="t-col">Últimos Usuarios</div>
                        <div className="t-col">Actividad</div>
                        <div className="t-col">Hora</div>
                        <div className="t-col">Estatus</div>
                    </div>
                    <div className="t-row">
                        <div className="t-col">
                            <div className="user-comp">
                                <div className="avatar-us"></div>
                                <div className="user-desc">
                                    Robert Green
                                </div>
                            </div>
                        </div>
                        <div className="t-col">Assessed directly</div>
                        <div className="t-col">12:00 AM</div>
                        <div className="t-col"><span className="missed">Missed</span></div>
                    </div>
                </div>
                <div className="notification-bar">
                    <div className="top-head">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>     	    
    );
  }
}

export default requireAuth(Dashboard);
