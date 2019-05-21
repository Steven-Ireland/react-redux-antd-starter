import * as actionTypes from './actionTypes';

export default {
	addAirport: (airportCode) => {
		return (dispatch) => {
			dispatch({
				type: actionTypes.ADD_AIRPORT,
				code: airportCode,
			});
		};
	},

	removeAirport: (airportCode) => {
		return (dispatch) => {
			dispatch({
				type: actionTypes.REMOVE_AIRPORT,
				code: airportCode,
			});
		};
	},
}