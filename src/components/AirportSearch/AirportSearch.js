import React, { Component } from "react";
import { Input, Icon } from 'antd';
import { connect } from "react-redux";

import airportActions from '../../actions/airportActions';

import "./AirportSearch.css";

export class AirportSearch extends Component {
	render() {
		return (
			<div className="AirportSearch">
				<Input size="large" prefix={<Icon type="search" />} 
					onPressEnter={(e) => this.addAirport(e.target.value)}/>
			</div>
		);
	}

	addAirport = (code) => {
		const { dispatch } = this.props;
		const airportCode = code.toUpperCase();

		dispatch(airportActions.addAirport(airportCode));
	}
}

export default connect()(AirportSearch);