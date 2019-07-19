export const oncePerUser = () => {
	const users = new Set;
	return (userData) => {
		if (users.has(userData.id)) {
			return false;
		}
		users.add(userData.id);
		return true;
	}
};