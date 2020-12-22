import {
	CREATE_REMINDER,
	CREATE_REMINDER_SUCCESS,
	GET_REMINDERS_DAY,
	GET_REMINDERS_DAY_SUCCESS,
	GET_ALL_REMINDERS,
	GET_ALL_REMINDERS_SUCCESS,
} from "../constants/ActionsTypes";

export const createReminder = (params) => {
	return {
		type: CREATE_REMINDER,
		payload: params,
	};
};

export const createReminderSuccess = (response) => {
	return {
		type: CREATE_REMINDER_SUCCESS,
		payload: response,
	};
};

export const getRemindersByDay = (params) => {
	return {
		type: GET_REMINDERS_DAY,
		payload: params,
	};
};

export const getRemindersByDaySuccess = (response) => {
	return {
		type: GET_REMINDERS_DAY_SUCCESS,
		payload: response,
	};
};

export const getAllReminders = (params) => {
	return {
		type: GET_ALL_REMINDERS,
		payload: params,
	};
};

export const getAllRemindersSuccess = (response) => {
	return {
		type: GET_ALL_REMINDERS_SUCCESS,
		payload: response,
	};
};
