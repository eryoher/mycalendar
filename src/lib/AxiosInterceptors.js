import Axios from "axios";

export default function configureAxios(store) {
	Axios.defaults.timeout = 30000;
}
