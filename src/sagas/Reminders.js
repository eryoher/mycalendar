import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { CREATE_REMINDER } from "../constants/ActionsTypes";

import { createReminder } from "../api/Reminders";

import { createReminderSuccess } from "../actions";

function* createReminderRequest({ payload }) {
	try {
		const reminder = yield call(createReminder, payload);
		yield put(createReminderSuccess(reminder));
	} catch (error) {}
}

export function* createReminderSaga() {
	yield takeEvery(CREATE_REMINDER, createReminderRequest);
}

export default function* rootSaga() {
	yield all([fork(createReminderSaga)]);
}
