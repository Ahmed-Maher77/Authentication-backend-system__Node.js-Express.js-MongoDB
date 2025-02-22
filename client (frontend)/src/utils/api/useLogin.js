import api from "./axiosConfig";
import { useState } from "react";
import Cookies from "js-cookie";


const useLogin = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);

	const handleLogin = async (email, password) => {
		setError(null);
		setLoading(true);
		setResponse(null);

		try {
			const userData = { email, password };
			const res = await api.post(`/auth/login`, userData);
            setResponse(res.data);

			if (res.data.accessToken) {
				Cookies.set('accessToken', res.data.accessToken);
			}
			
			console.log("Login successful:", res.data);
		} catch (err) {
			const message = err.response?.data?.message || err.message;
			setError(message);
			console.log("Login error:", message);
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, response, handleLogin };
};

export default useLogin;
