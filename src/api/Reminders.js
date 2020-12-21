import Axios from "axios";

export const createReminder = async (params) => {
	const response = await Axios.post("/reminders", params);
	return response.data;
};
