const db = require("../database")

const getAllPostQuery = async () => {
    try {
        const result = await db.query(
            `SELECT 
            users.username, 
            users.description, 
            users.user_id, 
            COALESCE(post_like.status, false) as status,
            post_comment.comment_content,
            post_comment.comment_id,
            posts.post_id, 
            posts.post_content, 
            posts.like_count, 
            posts.comment_count, 
            posts.repost_count, 
            posts.created_date 
        FROM 
            posts 
        LEFT JOIN 
            users 
        ON 
            posts.user_id = users.user_id 
        LEFT JOIN 
            post_like 
        ON 
            posts.post_id = post_like.post_id 
        LEFT JOIN 
            post_comment
        ON
            posts.post_id = post_comment.post_id
        ORDER BY
            posts.created_date DESC`)
        return result.rows
    } catch (error) {
        throw new Error('Database query failed');
    }
}

const postInsertingQuery = async ( postContent, userId ) => {
    try {
        await db.query(
            `INSERT INTO 
                posts (post_content, user_id) 
            VALUES 
                ($1, $2)`, 
            [postContent, userId]);
    } catch (error) {
        throw new Error('Database query failed');
    }
}

module.exports = { 
    getAllPostQuery, 
    postInsertingQuery
}