const User = require("../models/Users");
const { createToken, validateToken } = require("../middleware/auth/token.js");

const login = async (req, res) => {
	const { username } = req.body;

	const token = createToken(username);

	return token
		? res.status(200).json(token)
		: res.status(404).json("Token oluşturulurken bir hata meydana geldi.");
};

const cokGizli = async (req, res) => {
	const { token } = req.headers;
	console.log(token);

	if (validateToken(token)) {
		return res.status(200).json({
			"çok gizli mesaj":
				"Tebrikler içeridesin! Hadi çabuk, PEŞİMİZDELER!!! Her an bizi bulabilirler. Bunlar ne mi? Lozan'ın gizli madd...",
		});
	}
	return res.status(404).json("bizimle değilsin");
};

module.exports = { login, cokGizli };
