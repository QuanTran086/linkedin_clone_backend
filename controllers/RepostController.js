const { repostQuery } = require("../models/RepostModel")

const repost = async (request, response) => {
    const { post_id, user_id } = request.body

    try {
        await repostQuery(post_id, user_id)
    } catch (error) {
        console.error("Repost Error:", error.message);
        response.sendStatus(500);
    }
}

module.exports = { repost }