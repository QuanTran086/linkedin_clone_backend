const { signInQuery } = require("../models/SignInModel");

const signIn = async (request, response) => {
    const { email, password } = request.body;

    try {
        const userRecords = await signInQuery(email, password);

        if (userRecords.length > 0) {
            const user = userRecords[0];
            response.status(200).json({ username: user.username, description: user.description, user_id: user.user_id });
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        console.error("Sign In Error:", error.message);
        response.sendStatus(500);
    }
};

module.exports = { signIn };