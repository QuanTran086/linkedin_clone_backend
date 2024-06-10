const { like } = require("../controllers/LikeController")
const express = require("express")
const router = express.Router()

router.post("/", like)

module.exports = router