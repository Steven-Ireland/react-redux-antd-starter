import React, { Component } from "react";
import { connect } from "react-redux";

import Airport from '../Airport';

import "./AirportListings.css";

class AirportListings extends Component {
	render() {
		const { watching } = this.props.airport;
		return (
			<div className="AirportListings">
				{
					watching.map(airportCode => {
						return (
							<Airport code={airportCode} key={airportCode} />
						);
					})
				}
			</div>
		);
	}
}

export default connect(state => ({ airport: state.airport }))(AirportListings);