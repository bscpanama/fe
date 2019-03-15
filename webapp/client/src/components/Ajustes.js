import React, { Component } from 'react';
import { connect } from 'react-redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';



class Ajustes extends Component {
	componentDidMount() {
	    document.title = "BS&C - Ajustes";
	    document.body.classList.remove('login');
	}

  render(){
    return (
    	<div>
        	<Sidebar />
        	<div className={'main-content ' + this.props.menustatus}>
        		<Header/>             
        		<div className="main-container">
                    <div className="clearfix">
                        <h2>Ajustes</h2>
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

export default connect(mapStateToProps)(requireAuth(Ajustes));
