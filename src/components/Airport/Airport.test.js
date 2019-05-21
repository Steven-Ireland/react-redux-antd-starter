import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { Airport } from './Airport'; 

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

//Enzyme 
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


it('renders without crashing', () => { 
	const div = document.createElement('div'); 
	ReactDOM.render(<Airport code="LAX"/>, div); 
	ReactDOM.unmountComponentAtNode(div); 
});

it('queries info from weather API', async () => {

	const mockAxios = new MockAdapter(axios);
	mockAxios.onGet('https://api.weather.gov/stations/KLAX')
		.reply(200, 
			{ 
	      		geometry: {
	      			coordinates: [1,2]
	      		},
	      		properties: {
	      			timeZone: "America/New_York"
	      		}
	      	}
	    );

	mockAxios.onGet('https://api.weather.gov/points/2,1')
		.reply(200, 
			{ 
	      		properties: {
	      			forecast: "https://forecast.link"
	      		}
	      	}
	    );

	mockAxios.onGet('https://forecast.link')
		.reply(200, 
			{ 
	      		properties: {
	      			"periods": [
						{
							"isDaytime": true,
							"temperature": 75,
							"temperatureUnit": "F",
							"windSpeed": "8 mph",
							"windDirection": "NW",
							"icon": "https://api.weather.gov/icons/land/day/few?size=medium",
							"shortForecast": "Sunny",
							"detailedForecast": "Sunny, with a high near 75. Northwest wind around 8 mph."
						}
					]
	      		}
	      	}
	    );

	const wrapper = shallow(<Airport code="LAX" />);

	const data = await wrapper.instance().getForecastData();

	expect(data.temperature).toBe(75);
	expect(data.temperatureUnit).toBe("F");
	expect(data.windSpeed).toBe("8 mph");
	expect(data.windDirection).toBe("NW");
	expect(data.icon).toBe("https://api.weather.gov/icons/land/day/few?size=medium");
	expect(data.shortForecast).toBe("Sunny");
	expect(data.detailedForecast).toBe("Sunny, with a high near 75. Northwest wind around 8 mph.")
	expect(data.localTime).toBeDefined();
});