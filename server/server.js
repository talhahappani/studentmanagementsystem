const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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

// app.get("/login", (req, res) => {
//     if(req.session.user){
//         res.send({loggedIn: true, user: req.session.user})
//     } else {
//         res.send({loggedIn: false});
//     }
// });

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Message: "Not authorized."})
    } else {
        jwt.verify(token, "secretkey", (err, decoded) => {
            if(err){
                return res.json({Message: "Auth error."})
            } else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get("/auth", verifyUser, (req,res) => {
    return res.json({Status: "Success", name: req.name})
});

app.post('/login', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
  

    try {
        const result = await queryAsync("SELECT * FROM usertable WHERE user = ?;", user);
        

        if (result.length > 0) {
            const hashedPassword = result[0].password;
            const passwordMatch = await bcrypt.compare(password, hashedPassword)
            if (passwordMatch) {
                // req.session.user = result; // session
                // console.log(req.session.user);
                const name = result[0];
                const token = jwt.sign({name}, "secretkey", {expiresIn: "1d"} );
                res.cookie('token', token);
                res.send({ Status: "Success", user: result[0] });
            } else {
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

app.post("/create", (req, res) => {
    const sql = "INSERT INTO crud (`Name`, `Surname`, `Age`, `Department`, `Score`) VALUES (?, ?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.surname,
        req.body.age,
        req.body.department,
        req.body.score
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.put("/update/:id", (req, res) => {
        const sql = "UPDATE crud SET `Name` = ?, `Surname` = ?, `Age` = ?, `Department` = ?, `Score` = ? WHERE ID = ?";
        const values = [
        req.body.name,
        req.body.surname,
        req.body.age,
        req.body.department,
        req.body.score
    ];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.json(data);
    });
});

app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM crud WHERE id = ?";
    const id = req.params.id;

db.query(sql, [id], (err, data) => {
    if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.json(data);
});
});




app.get("/", (req,res) => {
    const sql = "SELECT * FROM crud"
    db.query(sql, (err, data) => {
        if(err) {
            return res.json("Error")
        }

        return res.json(data);
    })
})

app.get("/logout", (req,res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
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