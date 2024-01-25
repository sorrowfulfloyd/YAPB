require("dotenv").config();
const jwt = require("jsonwebtoken");
const KEY = process.env.TOKEN_KEY;

const createToken = (username) => {
	const token = jwt.sign({ for: username }, KEY, { expiresIn: "1w" });

	return token ? true : false;
};

const validateToken = (token) => {
	return jwt.verify(token, KEY, (error, token) => {
		if (error) {
			return null;
		}
		return token;
	});
};

module.exports = { createToken, validateToken };
