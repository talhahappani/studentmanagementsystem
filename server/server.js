const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60* 60 * 24
    }
}));

const db = mysql.createConnection({
    user: "newuser",
    host: "localhost",
    password: "password1#",
    database: "userDB"
});

app.post('/register', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const userType = req.body.userType;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await queryAsync("INSERT INTO usertable (user, password, userType) VALUES (?, ?, ?)", [user, hashedPassword, userType]);
        // Handle success, send a response or do something else
        res.status(200).send("User registered successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/login", (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false});
    }
});

app.post('/login', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
  

    try {
        const result = await queryAsync("SELECT * FROM usertable WHERE user = ?;", user);
        

        // Check if there is at least one matching user
        if (result.length > 0) {
            const hashedPassword = result[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword)
            if (passwordMatch) {
                // Passwords match, login successful
                req.session.user = result;
                console.log(req.session.user);
                res.send({ message: "Login successful", user: result[0] });
            } else {
                // Wrong password
                res.status(401).send({ message: "Wrong username/password combination" });
            }
        } else {
            res.status(401).send({ message: "Wrong username" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/logout", (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error("Logout failed:", err);
            res.status(500).json({ success: false, message: "Logout failed" });
        }
    })
})


function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.listen(3001, () => {
    console.log("running server");
});