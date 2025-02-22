import { useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Logout from "./components/Logout";
import UserProfile from "./components/UserProfile";

function App() {
	const [showUserData, setShowUserData] = useState(false);

	return (
		<div className="App">
			<Logout />
			<LoginForm />
			<hr />
			<SignUpForm />
			
			<hr />

			<button type="button" onClick={() => setShowUserData((prev) => !prev)}>
				{showUserData ? "Hide" : "Show"}
			</button>
			{showUserData && <UserProfile />}
		</div>
	);
}

export default App;
