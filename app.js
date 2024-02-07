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

    const result = await client.query("SELECT MAX(user_id) FROM users");
    let maxId = result.rows[0].max || 0; 
    let nextUserId = maxId + 1;

    await client.query("INSERT INTO users (user_id, username, description, email, passwords) VALUES ($1, $2, $3, $4, $5) RETURNING *", [nextUserId, username, description, email, password]);

    response.sendStatus(201); 
});

app.post("/login", async (request, response) => {
    const { email, password } = request.body;

    try {
        const result = await client.query("SELECT * FROM users WHERE email = $1 AND passwords = $2", [email, password]);

        if (result.rows.length > 0) {
            response.send({ message: "Login successful" });
        } else {
            response.send({ message: "Wrong email or password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        response.status(500).send({ message: "Internal server error" });
    }
});

app.listen(5000);