const express = require("express");
const app = express();
//brings in the validateUser from validation.js file
const validateUser = require("./validation");

const users = [
	{
		email: "darien@gmail.com",
		password: "hello",
	},
	{
		email: "gin@gmail.com",
		password: " hello",
	},
];

//helps parse json file
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello");
});

app.post("/user", (req, res) => {
	//validateUser is a function that takes in req.body, it either returns { success: true } OR { success: false, message: "why its not valid"}
	const validation = validateUser(req.body);
	if (validation.success === false) {
		res.json(validation);
	} else {
		users.push(req.body);
		res.json({ success: true, users: users });
	}
});
//:email is the parameter name
app.put("/update-user/:email", (req, res) => {
	//array method .find returns the first found element in an array
	const foundUser = users.find((user) => {
		return user.email === req.params.email;
	});
	console.log("40", foundUser);
	//array method .findIndex returns the index number of the found item(location of the item), -1 not found
	const userIndex = users.findIndex((user) => {
		return user.email === req.params.email;
	});

	if (userIndex === -1) {
		return res.json({ success: false, message: "user not found" });
	}

	//checks for what needs to be updated
	if (req.body.email.length > 0) {
		foundUser.email = req.body.email;
	}
	if (req.body.password.length > 0) {
		foundUser.password = req.body.password;
	}
	console.log("57", foundUser);
	//replaces the user info with the foundUser info based on the index location
	users[userIndex] = foundUser;

	res.json({
		success: true,
		user: users,
	});
});

//Delete user by email, checks email from the req.params
app.delete("/delete-user/:email", (req, res) => {
	//foundIndex uses array method of .findIndex which returns the location(index number) if an email from the array matches the email of the req.params, else -1 (not found)
	const foundIndex = users.findIndex((user) => {
		return user.email === req.params.email;
	});

	//if user is not found
	if (foundIndex === -1) {
		return res.json({ success: false, message: "User is not found" });
	}
	// array method .splice removes or replaces an item in an array. takes in three arguments
	//First argument: the index of where you want to start
	//Second argument: how many you want to replace or remove. 0 (do not remove)
	//Third argument: input of what you want to put
	users.splice(foundIndex, 1);

	return res.json({
		success: true,
		users: users,
	});
});

app.listen(3000, () => {
	console.log("express running");
});
