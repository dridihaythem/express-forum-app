import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const useHttp = (stateInit = null, LoadingInit = false) => {
	const [loading, setLoading] = useState(LoadingInit);
	const [errors, setErrors] = useState([]);
	const [state, setState] = useState(stateInit);

	const token = useSelector((state) => state.auth.token);

	const sendRequest = async (url, method, body, callback) => {
		setLoading(true);
		setErrors([]);

		try {
			// add token
			const headers = {};
			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await axios({
				method: method,
				url: `${BACKEND_URL}${url}`,
				data: body,
				headers,
			});

			setLoading(false);
			setState(response.data);
			callback(response.data);
		} catch (e) {
			const response = e.response.data;

			if (response.hasOwnProperty('message')) {
				setErrors([{ param: 'default', message: response.message }]);
			} else {
				setErrors(response.errors);
			}

			setLoading(false);
		}
	};

	return { loading, errors, state, sendRequest };
};

export default useHttp;
