import api from "./axiosConfig";
import { useState, useEffect } from "react";


const useFetchUserData = (autoFetch = true) => {
	const [loading, setLoading] = useState(autoFetch);  // Initialize based on autoFetch
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get("/users");
            setData(res.data);
            console.log("User data fetched:", res.data);
        } catch (err) {
            const message = err.response?.data?.message || err.message;
            setError(message);
			console.log("Fetch error:", message);
        } finally {
            setLoading(false);
        }
    };

    // Automatic fetch on mount when autoFetch=true
    useEffect(() => {
        if (autoFetch) fetchUser();
    }, []); // Empty dependency array = runs once on mount

	return { 
        data, 
        loading, 
        error,
        refetch: fetchUser // Optional manual refetch capability
    };
};

export default useFetchUserData;


