import api from "./axiosConfig";
import { useState } from "react";
import Cookies from "js-cookie";


const useLogOut = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleLogout = async () => {
		setLoading(true);
		setError(null);

		try {
			await api.post("/auth/logout");
			console.log("Logout successful");
		} catch (err) {
			const message = err.response?.data?.message || "Failed to logout.";
      		setError(message);
			console.log("Logout error:", message);
		} finally {
			// clear tokens
			Cookies.remove('accessToken');
			setLoading(false);
		}
	};
	return { loading, error, handleLogout };
};

export default useLogOut;







