
const bcrypt = require("bcrypt");
const users = require("../database/users");
const api_messages = require("../messages/api_messages");

const authenticateUser = (req, res, next) => {

    const getUserByEmail = email => users.find(user => user.email === email);

    const checkUser = async (email, password) => {
        const user = getUserByEmail(email);
        if (user == null) {
            res.status(403);
            return res.json(api_messages.failure);
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                req.user = {
                    firstName: user.firstName,
                    familyName: user.familyName,
                    age: user.age,
                    phoneNumber: user.phoneNumber,
                    email: user.email
                };
                next();
            }
            else {
                res.status(403);
                return res.json(api_messages.failure);
            }
        }
        catch (error) {
            res.status(500);
            return res.json(api_messages.failure);
        }
    };

    checkUser(req.body.email, req.body.password);
};

module.exports = authenticateUser;