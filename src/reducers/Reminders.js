import {
	CREATE_REMINDER,
	CREATE_REMINDER_SUCCESS,
	GET_ALL_REMINDERS,
	GET_ALL_REMINDERS_SUCCESS,
	GET_REMINDERS_DAY,
	GET_REMINDERS_DAY_SUCCESS,
	REMOVE_REMINDERS_BY_DAY,
	REMOVE_REMINDERS_BY_DAY_SUCCESS,
} from "../constants/ActionsTypes";

const initialState = {
	reminder: null,
	dateReminder: null,
	reminders: null,
	allReminders: null,
	removeReminders: null,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_REMINDER:
			return { ...state, reminder: null };
		case CREATE_REMINDER_SUCCESS:
			return { ...state, reminder: action.payload };
		case GET_REMINDERS_DAY:
			return { ...state, dateReminder: action.payload };
		case GET_REMINDERS_DAY_SUCCESS:
			return { ...state, remindersByDay: action.payload };
		case GET_ALL_REMINDERS:
			return { ...state };
		case GET_ALL_REMINDERS_SUCCESS:
			return { ...state, allReminders: action.payload.data };
		case REMOVE_REMINDERS_BY_DAY:
			return { ...state, removeReminders: null };
		case REMOVE_REMINDERS_BY_DAY_SUCCESS:
			return { ...state, removeReminders: action.payload.data };
		default:
			return state;
	}
}

export default rootReducer;
