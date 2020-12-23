import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import {
	CREATE_REMINDER,
	GET_ALL_REMINDERS,
	GET_REMINDERS_DAY,
	REMOVE_REMINDERS_BY_DAY,
} from "../constants/ActionsTypes";

import { createReminder, getRemindersByDay, getAllReminders, removeRemindersByDay } from "../api/Reminders";

import {
	createReminderSuccess,
	getAllRemindersSuccess,
	getRemindersByDaySuccess,
	removeRemindersByDaySuccess,
} from "../actions";

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

function* removeRemindersByDayRequest({ payload }) {
	try {
		const remove = yield call(removeRemindersByDay, payload);
		yield put(removeRemindersByDaySuccess(remove));
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

export function* removeRemindersByDaySaga() {
	yield takeEvery(REMOVE_REMINDERS_BY_DAY, removeRemindersByDayRequest);
}

export default function* rootSaga() {
	yield all([
		fork(createReminderSaga),
		fork(getAllRemindersSaga),
		fork(getRemindersByDaySaga),
		fork(removeRemindersByDaySaga),
	]);
}
