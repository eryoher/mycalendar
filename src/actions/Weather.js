import { GET_WEATHER_CITY, GET_WEATHER_CITY_SUCCESS } from "../constants/ActionsTypes";

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
