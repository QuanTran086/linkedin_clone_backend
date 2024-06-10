const db = require("../database");

const signUpQuery = async ( username, description, email, password ) => {
    try {
        await db.query(
            `INSERT INTO 
                users (username, description, email, passwords) 
            VALUES 
                ($1, $2, $3, $4)`, 
            [username, description, email, password]);
    } catch (error) {
        throw new Error('Database query failed');
    }
}

module.exports = { signUpQuery }