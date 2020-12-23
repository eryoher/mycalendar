import Axios from "axios";

export const createReminder = async (params) => {
	const response = await Axios.put("/reminders", params);
	return response.data;
};

export const getRemindersByDay = async (params) => {
	const response = await Axios.get("/reminders/getRemindersByDay", { params });
	return response.data;
};

export const getAllReminders = async (params) => {
	const response = await Axios.get("/reminders/getRemindersByMonth", { params });
	return response.data;
};

export const removeRemindersByDay = async (params) => {
	const response = await Axios.post("/reminders/removeRemindersByDay", params);

	return response.data;
};
