function validateUser(userData) {
	if (userData.email.length <= 0 || userData.password.length <= 0) {
		//stops running once it hits the return
		return {
			success: false,
			message: "Email and password cannot be empty",
		};
	}
	if (typeof userData.email !== "string") {
		return {
			success: false,
			message: "Email and password must be string",
		};
	}
	if (typeof userData.password !== "string") {
		return {
			success: false,
			message: "Password must be string",
		};
	}
	return {
		success: true,
	};
}

module.exports = validateUser;
