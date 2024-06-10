const db = require("../database")

const updatePasswordQuery = async ( currentPassword, newPassword, confirmedPassword ) => {
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
        throw new Error('Database query failed');
    }
}

module.exports = { updatePasswordQuery }