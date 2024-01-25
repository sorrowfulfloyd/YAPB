const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { login, cokGizli } = require("../controller/user");

router.route("/").get(auth, cokGizli).post(login);

module.exports = router;
