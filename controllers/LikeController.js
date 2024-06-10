const { likeQuery } = require("../models/LikeModel");

const like = async (request, response) => {
    const { post_id, user_id, status } = request.body;

    try {
        const likeResult = await likeQuery(post_id, user_id, status);
        response.status(200).json(likeResult); 
    } catch (error) {
        console.error("Like Error:", error.message);
        response.sendStatus(500);
    }
};

module.exports = { like };