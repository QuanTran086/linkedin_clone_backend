const { updatePassword } = require("../controllers/UpdatePasswordController")
const express = require("express")
const router = express.Router()

router.post("/", updatePassword)

module.exports = router