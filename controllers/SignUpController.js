const { signUpQuery } = require("../models/SignUpModel");

const signUp = async (request, response) => {
    const { username, description, email, password } = request.body;

    try {
        await signUpQuery(username, description, email, password)
    } catch (error) {
        console.error("Sign Up Error:", error.message);
        response.sendStatus(500);
    }
}

module.exports = { signUp }