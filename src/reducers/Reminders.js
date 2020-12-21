import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS } from "../constants/ActionsTypes";

const initialState = {
	reminder: null,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_REMINDER:
			return { ...state, reminder: null };
		case CREATE_REMINDER_SUCCESS:
			return { ...state, reminder: action.payload };
		default:
			return state;
	}
}

export default rootReducer;
