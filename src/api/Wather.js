import Axios from "axios";

export const getWeatherByCity = async ({ city }) => {
	const api = {
		key: "dc7ed84d0f975d31f2bb82173269e2e7",
		base: "https://api.openweathermap.org/data/2.5/",
	};

	const connect = Axios.create();

	const response = await connect.get(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);
	return response.data;
};
