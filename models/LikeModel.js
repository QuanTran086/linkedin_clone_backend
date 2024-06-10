const db = require("../database")

const likeQuery = async ( post_id, user_id, status) => {
    try {
        const existingLikeResult = await db.query(
            `SELECT 
                * 
            FROM 
                post_like 
            WHERE 
                user_id = $1 AND post_id = $2`, 
            [user_id, post_id])
        
        if (existingLikeResult.rows.length > 0) {
            await db.query(
                `UPDATE 
                    post_like 
                SET 
                    status = $1 
                WHERE 
                    user_id = $2 AND post_id = $3`, 
                [status, user_id, post_id]);
        } else {
            await db.query(
                `INSERT INTO 
                    post_like (status, user_id, post_id) 
                VALUES 
                    ($1, $2, $3) RETURNING *`, 
                [status, user_id, post_id]);
        }

        if (status) {
            await db.query(
                `UPDATE 
                    posts 
                SET 
                    like_count = like_count + 1 
                WHERE 
                    post_id = $1`, 
                [post_id]);
        } else {
            await db.query(
                `UPDATE 
                    posts 
                SET 
                    like_count = GREATEST(like_count - 1, 0) 
                WHERE post_id = $1`, 
                [post_id]); 
        }

        const result = await db.query(
            `SELECT 
                like_count 
            FROM 
                posts 
            WHERE 
                post_id = $1`, 
            [post_id]);
        return result.rows[0]
    } catch (error) {
        throw new Error('Database query failed');
    }
}

module.exports = { likeQuery }