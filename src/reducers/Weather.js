import { GET_WEATHER_CITY, GET_WEATHER_CITY_SUCCESS } from "../constants/ActionsTypes";

const initialState = {
	weatherByDay: null,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_WEATHER_CITY:
			return { ...state, weatherByDay: null };
		case GET_WEATHER_CITY_SUCCESS:
			return { ...state, weatherByDay: action.payload };

		default:
			return state;
	}
}

export default rootReducer;
