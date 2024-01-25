const express = require("express");
const router = express.Router();

const { login, cokGizli } = require("../controller/user");

router.route("/").get(cokGizli).post(login);

module.exports = router;
