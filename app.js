require("dotenv").config();
const db = require("./database")
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())

// Sign Up
const signUpRoute = require("./routes/SignUp")
app.use("/signup", signUpRoute)


// Sign In
const signInRoute = require("./routes/SignIn")
app.use("/login", signInRoute)


// Posts
const PostRoute = require("./routes/Post")
app.use("/posts", PostRoute)


// Like
const LikeRoute = require("./routes/Like")
app.use("/like", LikeRoute)


// Comment
const CommentRoute = require("./routes/Comment")
app.use("/comment", CommentRoute)


// Repost
const RepostRoute = require("./routes/Repost")
app.use("/repost", RepostRoute)


// Update Password
const UpdatePasswordRoute = require("./routes/UpdatePassword")
app.use("/update-password", UpdatePasswordRoute)


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is listening on port ${port}`)});