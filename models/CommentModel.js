const db = require("../database")

const commentPostQuery = async ( commentContent, user_id, post_id ) => {
    try {
        await db.query(
            `INSERT INTO 
                post_comment (comment_content, user_id, post_id) 
            VALUES 
                ($1, $2, $3) RETURNING *`, 
            [commentContent, user_id, post_id]);
        
        await db.query(
            `UPDATE 
                posts 
            SET 
                comment_count = comment_count + 1 
            WHERE 
                post_id = $1`,
            [post_id])
    } catch (error) {
        throw new Error('Database query failed');
    }
}

const commentDeleteQuery = async ( comment_id, post_id ) => {
    try {   
        await db.query(
            `DELETE FROM 
                post_comment 
            WHERE
                comment_id = $1`,
            [comment_id]);
        
        await db.query(
            `UPDATE 
                posts 
            SET 
                comment_count = GREATEST(comment_count - 1, 0) 
            WHERE post_id = $1`, 
            [post_id]);
        
        const result = await db.query(
            `SELECT comment_count FROM posts WHERE post_id = $1`,
            [post_id]);

        response.json(result.rows[0].comment_count)
    } catch (error) {
        throw new Error('Database query failed');
    }
}

module.exports = {
    commentPostQuery,
    commentDeleteQuery
}