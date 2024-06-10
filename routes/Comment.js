const { commentPost, commentDelete } = require("../controllers/CommentController")
const express = require("express")
const router = express.Router()

router.post("/", commentPost)

router.delete("/", commentDelete)

module.exports = router