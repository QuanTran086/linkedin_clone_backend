const { getAllPostQuery, postInsertingQuery } = require("./models/PostModel")

const posts = async (request, response) => {
    try {
        await getAllPostQuery
    } catch (error) {
        console.error("Posts Error:", error.message);
        response.sendStatus(500);
    }
}

const postInserting = async (request, response) => {
    const { postContent, userId } = request.body

    try {
        await postInsertingQuery(postContent, userId)
        response.sendStatus(200)
    } catch (error) {
        console.error("Sign In Error:", error.message);
        response.sendStatus(500);
    }
}

module.exports = {
    posts,
    postInserting
}