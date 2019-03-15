import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';

import { loadStats } from '../actions/index.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);

         this.state = {
            query: 'monthly'   
        }
    }

	componentDidMount() {
	    document.title = "BS&C - Dashboard";
	    document.body.classList.remove('login');

        this.props.loadStats(this.state.query);
	}

  render(){
    const chartData = {
            labels: Object.keys(this.props.stats),
            datasets: [{
                label: 'Facturas',
                data: Object.values(this.props.stats),
                backgroundColor: 'rgb(15, 128, 103)',
                borderWidth: 0
            }]
        };
    const chartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };
    return (
    	<div>
    	<Sidebar />
    	<div className={'main-content ' + this.props.menustatus}>
    		<Header/>             
    		<div className="main-container">
            <div className="clearfix">
                <div className="stats-wrapper dashstats">
                    <div className="stats-options">
                        <div className="title">Estadísticas Mensuales</div>
                    </div>
                    <Bar data={chartData} options={chartOptions} height={50} />
                </div>
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

function mapStateToProps({ movements }) {
    const { stats, menustatus } = movements;
    return { stats, menustatus };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Dashboard));
