import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import requireAuth from './requireAuth';
import Header from './Header';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';

import { loadStats } from '../actions/index.js';


class Estadisticas extends Component {
    constructor(props) {
        super(props);

         this.state = {
            query: 'yearly'   
        }

        this.changeYearQuery = this.changeYearQuery.bind(this);
        this.changeMonthQuery = this.changeMonthQuery.bind(this);
        this.changeWeekQuery = this.changeWeekQuery.bind(this);
    }

	componentDidMount() {
	    document.title = "BS&C - Estadísticas";
	    document.body.classList.remove('login');

        this.props.loadStats(this.state.query);
	}

    changeYearQuery() {
         this.setState({
           query: 'yearly'
         });

         this.props.loadStats('yearly');
    }

    changeMonthQuery() {
         this.setState({
           query: 'monthly'
         });

         this.props.loadStats('monthly');
    }

    changeWeekQuery() {
         this.setState({
           query: 'weekly'
         });

         this.props.loadStats('weekly');
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
        	<div className="main-content">
        		<Header/>             
        		<div className="main-container">
                    <div className="stats-wrapper">
                        <div className="stats-options">
                            <div className="title">Estadísticas</div>
                            <ul className="choice-options">
                                <li><span className={this.state.query == "weekly" ? 'active' : '' } onClick={this.changeWeekQuery}>Semanal</span></li>
                                <li><span className={this.state.query == "monthly" ? 'active' : '' } onClick={this.changeMonthQuery}>Mensual</span></li>
                                <li><span className={this.state.query == "yearly" ? 'active' : '' } onClick={this.changeYearQuery}>Anual</span></li>
                            </ul>
                        </div>
                        <Bar data={chartData} options={chartOptions}/>
                    </div>
                </div>
            </div>
        </div>     	    
    );
  }
}

function mapStateToProps({ movements }) {
    const { stats } = movements;
    console.log(Object.keys(stats));
    return { stats };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadStats }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Estadisticas));
