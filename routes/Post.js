const { getPosts, createPosts } = ("./models/PostController")
const express = require("express")
const router = express.Router()

router.get("/", getPosts)

router.post("/", createPosts)

module.exports = router