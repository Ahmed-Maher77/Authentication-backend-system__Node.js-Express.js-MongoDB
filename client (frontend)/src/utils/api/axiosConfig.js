/* eslint-disable no-unused-vars */
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: "http://localhost:6060",
	withCredentials: true,
});

// Request interceptor to add access token
api.interceptors.request.use((config) => {
	const token = Cookies.get("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response?.status === 403 &&
			originalRequest.url !== "/auth/refresh"
		) {
			try {
				const refreshResponse = await api.post("/auth/refresh");
				Cookies.set("accessToken", refreshResponse.data.accessToken, {
					secure: true,
					sameSite: "Strict",
				});
				return api(originalRequest);
			} catch (refreshError) {
				Cookies.remove("accessToken");
				return Promise.reject({
					response: {
						data: { message: "Your session has expired. Please log in again." },
					},
				});
			}
		}
		return Promise.reject(error);
	}
);

export default api;
