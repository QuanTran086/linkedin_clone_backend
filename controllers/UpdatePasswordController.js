const { updatePasswordQuery } = require("../models/UpdatePasswordModel")

const updatePassword = async (request, response) => {
    const { currentPassword, newPassword, confirmedPassword } = request.body;
    
    if (newPassword !== confirmedPassword) {
        return response.status(400).send('New passwords do not match.');
    }

    try {
        await updatePasswordQuery(currentPassword, newPassword, confirmedPassword)
    } catch (error) {
        console.error("Update Password Error:", error.message);
        response.sendStatus(500);
    }
}

module.exports = {
    updatePassword
}