import React, { Component } from "react";

import AirportSearch from '../AirportSearch';
import AirportListings from '../AirportListings';

import "./App.css";

class App extends Component {
    render() {
        return (
        	<div className="App">
        		<AirportSearch />
        		<AirportListings />
            </div>
        );
    }
}

export default App;
