const { validateToken } = require("../helpers/jwt.js");

const auth = (req, res, next) => {
	const { token } = req.headers;
	const bearer = validateToken(token);

	if (!bearer) {
		return res.status(404).json("Geçersiz kullanıcı kimliği");
	}

	req.user = bearer.for;
	next();
};

module.exports = auth;
