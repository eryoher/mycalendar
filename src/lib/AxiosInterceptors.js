import Axios from "axios";

export default function configureAxios(store) {
	const config = {
		apiURL: process.env.REACT_APP_API_URL,
	};

	Axios.defaults.baseURL = config.apiURL;
	Axios.defaults.timeout = 30000;
}
