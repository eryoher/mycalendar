import { combineReducers } from "redux";
import ReminderReducer from "./Reminders";
import weatherReducer from "./Weather";

const reducers = combineReducers({
	reminders: ReminderReducer,
	weathers: weatherReducer,
});

const rootReducer = (state, action) => {
	return reducers(state, action);
};

export default rootReducer;
