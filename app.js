const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json())

const { Client } = require("pg");

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'linkedin_clone',
    user: 'postgres',
    password: '1234'
})

client.connect()

app.post("/signup", async (request, response) => {
    const { username, description, email, password } = request.body;
    try {
        const result = await client.query("INSERT INTO users (username, description, email, passwords) VALUES ($1, $2, $3, $4) RETURNING *", [username, description, email, password]);
    } catch (error) {
        console.error(error);
    }
});

app.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const result = await client.query("SELECT * FROM users WHERE email = $1 AND passwords = $2", [email, password]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            response.json({ username: user.username, description: user.description, user_id: user.user_id });
            response.sendStatus(200)
        } else {
            response.sendStatus(404)
        }
    } catch (error) {
        response.status(500)
    }
});

app.post("/update-password", async (request, response) => {
    const { currentPassword, newPassword, confirmedPassword } = request.body;
    
    if (newPassword !== confirmedPassword) {
        return response.status(400).send('New passwords do not match.');
    }

    try {
        const result = await client.query("SELECT * FROM users WHERE passwords = $1", [currentPassword]);

        if (result.rows.length > 0) {
            await client.query("UPDATE users SET passwords = $1, updated_date = NOW() WHERE passwords = $2", [newPassword, currentPassword]);
            response.sendStatus(200)
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        console.error('Error updating password:', error);
        response.sendStatus(500);
    }
});

app.get("/posts", async (request, response) => {
    const result = await client.query("SELECT users.username, users.description, posts.post_content, posts.like_count, posts.comment_count, posts.repost_count FROM posts JOIN users ON posts.user_id = users.user_id")
    response.json(result.rows)
})

app.post("/posts", async (request, response) => {
    console.log(request.body)
})

app.listen(5000);