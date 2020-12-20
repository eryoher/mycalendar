import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import configureStore from "./store";
import Mycalendar from "./components/calendar/mycalendar";

const store = configureStore();

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Mycalendar />
			</Provider>
		);
	}
}

export default App;
