import Axios from "axios";
import { api } from "../constants";

export const getWeatherByCity = async ({ city }) => {
	const connect = Axios.create();

	const response = await connect.get(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`);
	return response.data;
};
