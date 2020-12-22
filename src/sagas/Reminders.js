import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { CREATE_REMINDER, GET_ALL_REMINDERS, GET_REMINDERS_DAY } from "../constants/ActionsTypes";

import { createReminder, getRemindersByDay, getAllReminders } from "../api/Reminders";

import { createReminderSuccess, getAllRemindersSuccess, getRemindersByDaySuccess } from "../actions";

function* createReminderRequest({ payload }) {
	try {
		const reminder = yield call(createReminder, payload);
		yield put(createReminderSuccess(reminder));
	} catch (error) {}
}

function* getRemindersByDayRequest({ payload }) {
	try {
		const reminders = yield call(getRemindersByDay, payload);
		yield put(getRemindersByDaySuccess(reminders));
	} catch (error) {}
}

function* getAllRemindersRequest({ payload }) {
	try {
		const reminders = yield call(getAllReminders, payload);
		yield put(getAllRemindersSuccess(reminders));
	} catch (error) {}
}

export function* createReminderSaga() {
	yield takeEvery(CREATE_REMINDER, createReminderRequest);
}

export function* getRemindersByDaySaga() {
	yield takeEvery(GET_REMINDERS_DAY, getRemindersByDayRequest);
}

export function* getAllRemindersSaga() {
	yield takeEvery(GET_ALL_REMINDERS, getAllRemindersRequest);
}

export default function* rootSaga() {
	yield all([fork(createReminderSaga), fork(getAllRemindersSaga), fork(getRemindersByDaySaga)]);
}
