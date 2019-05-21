import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";

import airportActions from '../../actions/airportActions';

import { Icon, Card } from 'antd';
import "./Airport.css";

/* props
*	@code {REQUIRED} 
* 		3 character airport code
*
*/
export class Airport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			forecast: null,
		}
	}
	componentWillMount() {
		this.getForecastData().then(forecast => this.setState({forecast}));
	}
	render() {
		const { code } = this.props;
		const { forecast } = this.state;

		return (
			<div className="Airport">
				<h1>{code}</h1>
				
				{ !forecast && <Icon type="loading" style={{fontSize: '32px'}}/> }
				{ forecast && 
					<div className="AirportInfo">
						<Card cover={<img src={forecast.icon} />}
							actions={[
								<Icon type="reload" onClick={() => this.getForecastData().then(forecast => this.setState({forecast}))}/>,
								<Icon type="delete" onClick={this.removeAirport} />
							]}>
							
							<Card.Meta
								title={forecast.shortForecast}
								description={
									<div>
										<p>{forecast.localTime}</p>
										<p>Temperature: {forecast.temperature}{forecast.temperatureUnit}</p>
										<p>Wind: {forecast.windSpeed} {forecast.windDirection}</p>
										<p>{forecast.detailedForecast}</p>
									</div>
								}
 							/>
 						</Card>
					</div>
				}
			</div>
		);
	}

	getForecastData = async () => {
		try {
			const stationData = await axios.get(`https://api.weather.gov/stations/K${this.props.code}`);
			const [ latitude, longitude ] = stationData.data.geometry.coordinates;
			const { timeZone } = stationData.data.properties

			const pointInfo = await axios.get(`https://api.weather.gov/points/${longitude},${latitude}`);
			const forecastLink = pointInfo.data.properties.forecast;

			const forecastData = await axios.get(forecastLink);
			const currentWeather = {
				...forecastData.data.properties.periods[0], // for future weather, would need to grab all of this
				localTime: this.convertTime(timeZone).toLocaleString(),
			}

			return currentWeather;
		} catch (e) {
			// in prod, probably wire this up to a logging api like datadog
			console.log(e);
		}
	}

	convertTime = (timeZone) => {
		const timeLocaleString = new Date().toLocaleString("en-US", {timeZone});
		return new Date(timeLocaleString);
	}

	removeAirport = () => {
		const { dispatch } = this.props;

		dispatch(airportActions.removeAirport(this.props.code));
	}
}

export default connect()(Airport);