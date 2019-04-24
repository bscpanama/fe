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
