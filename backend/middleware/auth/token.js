require("dotenv").config();
const jwt = require("jsonwebtoken");
const KEY = process.env.TOKEN_KEY;

const createToken = (username) => {
	return username
		? jwt.sign({ for: username }, KEY, { expiresIn: "1w" })
		: null;
};

const validateToken = (token) => {
	const result = jwt.verify(token, KEY, (error, token) => {
		return token ? true : false;
	});
	return result;
};

module.exports = { createToken, validateToken };
