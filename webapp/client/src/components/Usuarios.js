import React, { Component } from 'react';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';


class Usuarios extends Component {
	componentDidMount() {
	    document.title = "BS&C - Usuarios";
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
                        <h2>Usuarios</h2>
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}

export default requireAuth(Usuarios);
