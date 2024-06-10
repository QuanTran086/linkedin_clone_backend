const express = require("express");
const { signUp } = require("../controllers/SignUpController")
const router = express.Router();

router.post("/", signUp);

module.exports = router;