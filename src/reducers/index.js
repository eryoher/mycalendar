import { combineReducers } from "redux";

const reducers = combineReducers({});

const rootReducer = (state, action) => {
	return reducers(state, action);
};

export default rootReducer;
