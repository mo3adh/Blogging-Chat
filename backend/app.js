const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'reglogin'
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
    conn.connect((err) => {
        if (err) {
        console.error('error connecting: ' + err.stack);
        return;
        }
        console.log('connected as id ' + conn.threadId);
    });
});

/* */
app.get('/', (req, res) => {
    const sql = "SELECT * FROM  users";
    conn.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

/* Create new user */
app.post('/createUser', async (req, res) => {
    let {username, password} = req.body;
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    
    const sql = "INSERT INTO users (username, password) VALUES(?, ?)";
    conn.query(sql, [username, password], (error, result) => {
        if(error) throw error;
        res.send(result);
    });
});

/* Create JWT */
const createToken = (id) => {
    return jwt.sign({ id }, 'secret token', {
        expiresIn: '7d'
    });
}

/* Login */
app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    conn.query(sql, [username], async (error, result) => {
        if(error) throw error;
        if(result.length>0) {
            const auth = await bcrypt.compare(password, result[0].password);
            if(auth) {
                const token = createToken(result[0].id);
                res.cookie('token', token, {
                    maxAge: 10000 * 24 * 60 * 60,
                    httpOnly: true,
                    // sameSite: 'lax'
                });
                res.send(result);
            } else {
                res.send({message: "Incorrect Password"});
            }
        }
        else res.send({message: "User doesn't exist"});
    });
});

/* Check Authentication */
const authJwt = (req, res, next) => {
    if(req.cookies.token) {
        jwt.verify(req.cookies.token, 'secret token', (error, decoded) => {
            if(error) throw error;
            res.send({id: decoded, logged: true});
            next();
        });
    } else res.send({logged: false});
}

app.get('/authUser', authJwt, (req, res) => {
    res.send('Congrats you are logged in');
});

/* Log Out */
app.get('/logOut', (req, res) => {
    res.clearCookie("token");
    res.send({message: 'token removed'});
});