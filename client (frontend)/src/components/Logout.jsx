// import { useNavigate } from 'react-router-dom';
import useLogOut from "../utils/api/useLogOut";

const Logout = () => {
    // const navigate = useNavigate();
    const { loading, error, handleLogout } = useLogOut();

    const handleClick = async () => {
        await handleLogout();
        // Always redirect even if API call fails
        // navigate('/login', { replace: true });
    };

	return <>
        <button className="Logout" onClick={handleClick} disabled={loading}>{loading? "Logging out..." : "Logout"}</button>
        {error && <p style={{color: "#f00"}}>{error}</p>}
    </>
};

export default Logout;
