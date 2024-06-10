const db = require("../database");

const signInQuery = async (email, password) => {
    try {
        const result = await db.query(
            `SELECT 
                * 
            FROM 
                users 
            WHERE 
                email = $1 AND passwords = $2`, 
            [email, password]
        );
        return result.rows;
    } catch (error) {
        throw new Error('Database query failed');
    }
};

module.exports = { signInQuery };