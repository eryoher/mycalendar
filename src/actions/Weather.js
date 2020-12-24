import {
	GET_WEATHER_CITY,
	GET_WEATHER_CITY_SUCCESS,
	GET_WEATHER_CITY_ERROR,
	CLEAR_WEATHER_STATE,
} from "../constants/ActionsTypes";

export const getWeatherByCity = (params) => {
	return {
		type: GET_WEATHER_CITY,
		payload: params,
	};
};

export const getWeatherByCitySuccess = (response) => {
	return {
		type: GET_WEATHER_CITY_SUCCESS,
		payload: response,
	};
};

export const getWeatherByCityError = (response) => {
	return {
		type: GET_WEATHER_CITY_ERROR,
		payload: response,
	};
};

export const clearWeatherState = () => {
	return {
		type: CLEAR_WEATHER_STATE,
		payload: null,
	};
};
