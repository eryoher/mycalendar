import { all } from "redux-saga/effects";
import reminderSaga from "./Reminders";
import weatherSaga from "./Weather";

export default function* rootSaga(getState) {
	yield all([reminderSaga(), weatherSaga()]);
}
