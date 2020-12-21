import { combineReducers } from "redux";
import ReminderReducer from "./Reminders";

const reducers = combineReducers({
	reminders: ReminderReducer,
});

const rootReducer = (state, action) => {
	return reducers(state, action);
};

export default rootReducer;
