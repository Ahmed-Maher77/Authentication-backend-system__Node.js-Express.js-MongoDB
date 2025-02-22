// import { useNavigate } from 'react-router-dom';
import useSignUp from "../utils/api/useSignUp";

const SignUpForm = () => {
    // const navigate = useNavigate();
	const { error, response, loading, handleSignUp } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
    	const formData = new FormData(e.target);
        await handleSignUp({
			first_name: formData.get('first_name'),
			last_name: formData.get('last_name'),
			email: formData.get('email'),
			password: formData.get('password')
		});
		// Redirect on successful registration
		if (response?.accessToken) {
			// navigate('/dashboard');
		}
    };

	return (
		<div className="SignUpForm">
			<h2>SignUp Form</h2>
			<form onSubmit={handleSubmit}>
                {error && <p style={{color: "#f00"}}>{error}</p>}
				{/* ============= First Name ============= */}
				<fieldset>
					<label htmlFor="first_name">First Name:</label>
					<input type="first_name" id="first_name" name="first_name" required />
				</fieldset>
				{/* ============= Last Name ============= */}
				<fieldset>
					<label htmlFor="last_name">Last Name:</label>
					<input type="last_name" id="last_name" name="last_name" required />
				</fieldset>
				{/* ============= Email ============= */}
				<fieldset>
					<label htmlFor="signup_email">Email:</label>
					<input type="email" id="signup_email" name="email" required />
				</fieldset>
				{/* ============= Password ============= */}
				<fieldset>
					<label htmlFor="signup_password">Password:</label>
					<input type="password" id="signup_password" name="password" required />
				</fieldset>
                {/* ============= Submit Button ============= */}
                <button type="submit" disabled={loading}>{loading? "Creating account..." : "Sign Up"}</button>
			</form>
		</div>
	);
};

export default SignUpForm;


