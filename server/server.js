if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// requirements
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
// const passport = require("passport");
const jwt = require("jsonwebtoken");
const authenticateUser = require("./authentication/authenticate_user");
const authenticateToken = require("./authentication/authenticate_token");
const users = require("./database/users");
let refreshTokens = require("./database/refresh_tokens");
const api_messages = require("./messages/api_messages");

const app = express();

// initializations
// const initializePassport = require("./configs/passport-config");;
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email)
// );

// common middlewares
app.use(express.json());
app.use(cors());

// routes
app.post("/api/auth/register", async (req, res) => {

    const isUserExist = users.find(user => user.email === req.body.email);

    if (isUserExist != null) {
        return res.status(409).json(api_messages.conflict);
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            firstName: req.body.firstName,
            familyName: req.body.familyName,
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: hashedPassword
        });

        res.status(200);
        res.json(api_messages.success);

        console.log(users);
        console.log("USER REGISTERD!");
    }
    catch {
        res.status(500);
        res.json(api_messages.failure);
    }

});

app.post("/api/auth/login", authenticateUser, (req, res, next) => {
    // User has been Authenticated
    const accessToken = generateToken(req.user, process.env.ACCESS_TOKEN_SECRET);
    const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.status(200);
    res.json({ message: "success", accessToken, refreshToken });

    console.log("USER LOGGED IN!", req.user.email);
});

function generateToken(user, secret) {
    return jwt.sign(user, secret, { expiresIn: "900s" });
}

app.post("/api/token", (req, res) => {
    const refreshToken = req.body.token;

    if (refreshToken == null) {
        // res.status(403);
        return res.status(403).json(api_messages.failure);
    }
    if (!refreshToken.includes(refreshToken)) {
        // res.status(403);
        return res.status(403).json(api_messages.failure);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            // res.status(403);
            return res.status(403).json(api_messages.failure)
        }
        const accessToken = generateToken(user, process.env.ACCESS_TOKEN_SECRET);

        res.status(200);
        res.json({ message: "success", accessToken });

        console.log("USER GET NEW ACCESS TOKEN!");
    });
});

app.delete("/api/logout", (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);

    res.status(200);
    res.json(api_messages.success);

    console.log("USER LOGGED OUT!");
});

app.get("/api/profile", authenticateToken, (req, res) => {
    const userData = users.find(user => user.email === req.user.email);

    res.status(200);
    res.json({
        ...api_messages.success, user: {
            firstName: userData.firstName,
            familyName: userData.familyName,
            age: userData.age,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            id: userData.id
        }
    });

    console.log("USER ENTERED TO PROFILE!");
});

app.post("/api/edit", authenticateToken, async (req, res) => {

    const oldUserIndex = users.findIndex(user => user.id === req.body.id);

    users[oldUserIndex].firstName = req.body.firstName;
    users[oldUserIndex].familyName = req.body.familyName;
    users[oldUserIndex].age = req.body.age;
    users[oldUserIndex].phoneNumber = req.body.phoneNumber;
    users[oldUserIndex].password = await bcrypt.hash(req.body.password, 10);

    const newUser = users[oldUserIndex];

    // console.log(newUser);

    res.status(200).json({
        ...api_messages.success, user: {
            firstName: newUser.firstName,
            familyName: newUser.familyName,
            age: newUser.age,
            phoneNumber: newUser.phoneNumber,
            email: newUser.email,
            id: newUser.id
        }
    });

    console.log(users);
});

app.get("/api/dashboard", authenticateToken, (req, res) => {
    res.status(200);
    res.json({ ...api_messages.success, users });

    console.log("USER ENTERED TO DASHBOARD!");
});

// running server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});