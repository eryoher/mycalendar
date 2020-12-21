import { all } from "redux-saga/effects";
import reminderSaga from "./Reminders";

export default function* rootSaga(getState) {
	yield all([reminderSaga()]);
}
