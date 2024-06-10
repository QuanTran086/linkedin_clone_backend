const { commentPostQuery, commentDeleteQuery } = require("../models/CommentModel");

const commentPost = async (request, response) => {
    const { commentContent, user_id, post_id } = request.body

    try {
        await commentPostQuery ( commentContent, user_id, post_id )
    } catch (error) {
        console.error("Comment Error:", error.message);
        response.sendStatus(500);
    }
}

const commentDelete = async (request, response) => {
    const { comment_id, post_id } = request.body

    try {
        await commentDeleteQuery ( comment_id, post_id )
    } catch (error) {
        console.error("Comment Delete Error:", error.message);
        response.sendStatus(500);
    }
}

module.exports = {
    commentPost,
    commentDelete
}