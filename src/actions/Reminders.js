import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS } from "../constants/ActionsTypes";

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
