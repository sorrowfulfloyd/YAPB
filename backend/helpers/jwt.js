require("dotenv").config();
const jwt = require("jsonwebtoken");
const KEY = process.env.TOKEN_KEY;

const createToken = (username) => {
	return username
		? jwt.sign({ for: username }, KEY, { expiresIn: "1w" })
		: null;
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
