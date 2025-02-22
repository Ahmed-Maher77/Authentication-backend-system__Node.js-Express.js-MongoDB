import useFetchUserData from "../utils/api/useFetchUserData";

const UserProfile = () => {
    // Data fetches automatically on component mount
	const { data: userData, loading, error } = useFetchUserData();

	if (loading) return <div>Loading user...</div>;
	if (error) return <div>{error || "Failed to load user"}</div>;

	return (
		<div>
			{userData.length ? (
				userData?.map((user, i) => (
					<div key={i}>
						<p>
							Hi: <b>{`${user.first_name} ${user.last_name}`}</b>
						</p>
						<p>
							Email: <b>{user.email}</b>
						</p>
                        {i >= userData.length - 1 || <hr />}
					</div>
				))
			) : (
				<div className="bold">No user found.</div>
			)}
		</div>
	);
};

export default UserProfile;
