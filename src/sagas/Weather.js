import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_WEATHER_CITY } from "../constants/ActionsTypes";

import { getWeatherByCity } from "../api/Wather";
import { getWeatherByCityError, getWeatherByCitySuccess } from "../actions";

function* getWeatherByCityRequest({ payload }) {
	try {
		const weather = yield call(getWeatherByCity, payload);
		yield put(getWeatherByCitySuccess(weather));
	} catch (error) {
		const { message } = error.response.data;
		yield put(getWeatherByCityError(message));
	}
}

export function* getWeatherByCitySaga() {
	yield takeEvery(GET_WEATHER_CITY, getWeatherByCityRequest);
}

export default function* rootSaga() {
	yield all([fork(getWeatherByCitySaga)]);
}
