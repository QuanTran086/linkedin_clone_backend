require("dotenv").config();
const db = require("./database")
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())

app.post("/signup", async (request, response) => {
    const { username, description, email, password } = request.body;
    try {
        await db.query(
            `INSERT INTO 
                users (username, description, email, passwords) 
            VALUES 
                ($1, $2, $3, $4) 
            RETURNING *`, 
            [username, description, email, password]);
    } catch (error) {
        response.sendStatus(500)
    }
});

app.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const result = await db.query(
            `SELECT 
                * 
            FROM 
                users 
            WHERE 
                email = $1 AND passwords = $2`, 
            [email, password]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            response.status(200).json({ username: user.username, description: user.description, user_id: user.user_id });
        } else {
            response.sendStatus(404)
        }
    } catch (error) {
        response.sendStatus(500)
    }
});

app.post("/update-password", async (request, response) => {
    const { currentPassword, newPassword, confirmedPassword } = request.body;
    
    if (newPassword !== confirmedPassword) {
        return response.status(400).send('New passwords do not match.');
    }

    try {
        const result = await db.query(
            `SELECT 
                * 
            FROM 
                users 
            WHERE 
                passwords = $1`, 
            [currentPassword]);

        if (result.rows.length > 0) {
            await db.query(
                `UPDATE 
                    users 
                SET 
                    passwords = $1, 
                    updated_date = NOW() 
                WHERE 
                    passwords = $2`, 
                [newPassword, currentPassword]);
            response.sendStatus(200)
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        response.sendStatus(500);
    }
});

app.post("/rendering-posts", async (request, response) => {
    const { user_id } = request.body

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
    WHERE
        posts.user_id = $1
    ORDER BY
        posts.created_date DESC`, 
        [user_id])
    response.json(result.rows)
})

app.post("/posts", async (request, response) => {
    const { postContent, userId } = request.body

    try {
        const result = await db.query(
            `INSERT INTO 
                posts (post_content, user_id) 
            VALUES 
                ($1, $2) RETURNING *`, 
            [postContent, userId]);
        response.sendStatus(200)
    } catch (error) {
        response.sendStatus(500)
    }
})

app.post("/like", async (request, response) => {
    const { post_id, user_id, status } = request.body;

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
        response.status(200).json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
});

app.post("/comment", async (request, response) => {
    const { commentContent, user_id, post_id } = request.body
    
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
        response.json(commentContent)
    } catch (error) {
        response.sendStatus(500)
    }
})

app.post("/delete-comment", async (request, response) => {
    const { comment_id, post_id } = request.body

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
        console.log(error)
        response.sendStatus(500)
    }
})

app.post("/repost", async (request, response) => {
    const { post_id } = request.body;

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

        response.status(200)
    } catch (error) {
        console.error(error);
        response.sendStatus(500);
    }
});


const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Server is listening on port ${port}`)});