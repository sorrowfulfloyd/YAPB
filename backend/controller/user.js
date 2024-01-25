const User = require("../models/Users");
const { createToken, validateToken } = require("../helpers/jwt.js");

const login = async (req, res) => {
	const { username } = req.body;

	const token = createToken(username);

	return token
		? res.status(200).json(token)
		: res.status(404).json("Token oluşturulurken bir hata meydana geldi.");
};

const cokGizli = async (req, res) => {
	return res.status(200).json({
		"çok gizli mesaj":
			"Tebrikler içeridesin! Hadi çabuk, PEŞİMİZDELER!!! Her an bizi bulabilirler. Bunlar ne mi? Lozan'ın gizli madd...",
	});
};

module.exports = { login, cokGizli };
