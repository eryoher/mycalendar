import {
	CLEAR_WEATHER_STATE,
	GET_WEATHER_CITY,
	GET_WEATHER_CITY_ERROR,
	GET_WEATHER_CITY_SUCCESS,
} from "../constants/ActionsTypes";

const initialState = {
	weatherByDay: null,
	weatherError: null,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_WEATHER_CITY:
			return { ...state, weatherByDay: null };
		case GET_WEATHER_CITY_SUCCESS:
			return { ...state, weatherByDay: action.payload, weatherError: null };
		case GET_WEATHER_CITY_ERROR:
			return { ...state, weatherError: action.payload };
		case CLEAR_WEATHER_STATE:
			return { ...initialState };
		default:
			return state;
	}
}

export default rootReducer;
