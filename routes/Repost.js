const { repost } = require("../controllers/RepostController");
const express = require("express")
const router = express.Router()

router.post("/", repost)

module.exports = router