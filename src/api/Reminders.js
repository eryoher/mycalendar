import Axios from "axios";

export const createReminder = async (params) => {
	const response = await Axios.post("/reminders", params);
	return response.data;
};

export const getRemindersByDay = async (params) => {
	const response = await Axios.get("/reminders/getRemindersByDay", { params });
	return response.data;
};

export const getAllReminders = async (params) => {
	const response = await Axios.get("/reminders", { params });
	return response.data;
};
