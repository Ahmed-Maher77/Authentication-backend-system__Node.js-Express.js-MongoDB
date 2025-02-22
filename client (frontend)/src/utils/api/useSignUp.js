import api from "./axiosConfig";
import { useState } from "react";
import Cookies from 'js-cookie';


const useSignUp = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);

	const handleSignUp = async (userData) => {
		setError(null);
		setLoading(true);
		setResponse(null);

		try {
			const res = await api.post("auth/register", userData);
            setResponse(res.data);

			if (res.data.accessToken) {
				Cookies.set('accessToken', res.data.accessToken);
			}

			console.log("Registration successful:", res.data);
		} catch (err) {
			const message = err.response?.data?.message || err.message;
			setError(message);
			console.log("Registration error:", message);
		} finally {
			setLoading(false);
		}
	};

	return { error, response, loading, handleSignUp };
};

export default useSignUp;


