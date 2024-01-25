const express = require("express");
const app = express();
const { Client } = require("pg")

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'linkedin_clone',
    user: 'postgres',
    password: '1234'
})

client.connect()

app.listen(5000, () => {console.log("Server started on port 5000")});