// import { useNavigate } from 'react-router-dom';
import useLogin from "../utils/api/useLogin";

const LoginForm = () => {
	// const navigate = useNavigate();
	const { error, loading, response, handleLogin } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		await handleLogin(
			formData.get('email'),
			formData.get('password')
		);
		// Redirect on successful login
		if (response?.accessToken) {
			// navigate('/dashboard');
		}
	};

	return (
		<div className="LoginForm">
			<h2>Login Form</h2>
			<form onSubmit={handleSubmit}>
				{error && <p style={{ color: "#f00" }}>{error}</p>}
				{/* ============= Email ============= */}
				<fieldset>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" required />
				</fieldset>
				{/* ============= Password ============= */}
				<fieldset>
					<label htmlFor="password">Password:</label>
					<input type="password" id="password" name="password" required />
				</fieldset>
				{/* ============= Submit Button ============= */}
				<button type="submit" disabled={loading}>
					{loading ? "Loading..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
