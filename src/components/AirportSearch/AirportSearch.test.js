import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { AirportSearch } from './AirportSearch'; 
import airportActions from '../../actions/airportActions';


//Enzyme 
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

jest.mock('../../actions/airportActions');

it('renders without crashing', () => { 
	const div = document.createElement('div'); 
	ReactDOM.render(<AirportSearch/>, div); 
	ReactDOM.unmountComponentAtNode(div); 
});

it('adds an airport to the watchlist', async () => {
	const dispatch = jest.fn();
	const wrapper = shallow(<AirportSearch dispatch={dispatch}/>);

	wrapper.instance().addAirport("LAX");

	expect(dispatch).toHaveBeenCalled();
	expect(airportActions.addAirport).toHaveBeenCalledWith("LAX");
});