const db = require("../database")

const repostQuery = async ( post_id, user_id ) => {
    try {
        await db.query(
            `UPDATE 
                posts 
            SET 
                repost_count = repost_count + 1 
            WHERE 
                post_id = $1`, 
            [post_id]
        );

        const originalPost = await db.query(
            `SELECT 
                post_content, post_image, like_count, comment_count, repost_count 
            FROM 
                posts 
            WHERE 
                post_id = $1`, 
            [post_id]
        );

        await db.query(
            `INSERT INTO 
                posts (post_content, post_image, like_count, comment_count, repost_count, user_id, repost_id) 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`, 
            [originalPost.rows[0].post_content, originalPost.rows[0].post_image, originalPost.rows[0].like_count, originalPost.rows[0].comment_count, originalPost.rows[0].repost_count, user_id, originalPost.rows[0].post_id] 
        )
    } catch (error) {
        throw new Error('Database query failed');
    }
}

module.exports = {
    repostQuery
}