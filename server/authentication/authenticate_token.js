const jwt = require("jsonwebtoken");
const api_messages = require("../messages/api_messages");

// require("dotenv").config();

// This function gonna authenticate JSON Web Token
const authenticateToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    // because of the authorizatoin header style ("Bearer TOKEN")
    // get second part of authorization header 
    // which is jwt token
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.status(401);
        return res.json(api_messages.failure);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            res.status(403);
            return res.json(api_messages.failure);
        }
        req.user = user;
        next();
    });

};

module.exports = authenticateToken;