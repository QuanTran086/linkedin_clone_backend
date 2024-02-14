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
            response.sendStatus(200)
        } else {
            response.sendStatus(404)
        }
    } catch (error) {
        response.status(500)
    }
});

app.listen(5000);