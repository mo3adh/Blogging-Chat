const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const http = require("http");
const socketIo = require("socket.io");


const conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'socialmedia'
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

/* Create my socket */
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
});

io.on('connection', socket => {
    socket.on('message', ({ name, message }) => {
      io.emit('message', { name, message });
    });
});
  

const serverPort = 4000;
server.listen(serverPort, () => console.log(`Listening on port ${serverPort}`));


/********************************************************************************* */
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

/* Create new user */
app.post('/createUser', async (req, res) => {
    let {username, password} = req.body;

    let sql = 'SELECT * FROM  users WHERE username = ?';
    conn.query(sql, [username] ,(error, result) => {
        if(error) throw error;
        if(result)
            res.send({found: true});
    });

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    
    sql = "INSERT INTO users(username, password) VALUES(?, ?)";
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
                    // httpOnly: true,
                });
                res.send({token: token});
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

/* Get my Info */
app.get('/getInfo', (req, res) => {
    const data = jwt.decode(req.cookies.token);
    if(data) {
        let sql = 'SELECT * FROM users WHERE id = ?';
        conn.query(sql, [data.id], (error, result) => {
            if(error) res.send(error.message);
            else res.send({username: result[0].username});
        });
    } else res.send({id: null});
    
});

/* Log Out */
app.get('/logOut', (req, res) => {
    res.clearCookie("token");
    res.send({message: 'token removed'});
});

/* Retrieve all posts */
app.get('/getPosts', (req, res) => {
    const sql = 'SELECT * FROM posts, users WHERE users.id = userId';
    conn.query(sql, (error, result) => {
        if(error) res.send(error);
        res.send(result);
    });
});

app.get('/myPosts', (req, res) => {
    const data = jwt.decode(req.cookies.token);
    if(data) {
        let sql = 'SELECT * FROM posts, users where userId = ? AND posts.userId = users.id';
        conn.query(sql, data.id, (error, result) => {
            if(error) res.send(error.message);
            else res.send(result);
        });
    } else res.send({});
}); 

/* Create new post */
app.post('/createPost', (req, res) => {
    const {postBody} = req.body;
    const data = jwt.decode(req.cookies.token);

    /* Retrieve user info from databese */
    if(data) {
        let sql = 'SELECT * FROM users where id = ?';
        conn.query(sql, data.id, (error, result) => {
            if(error) res.send(error.message);
            if(result) {
                let userId = result[0].id;
                sql = 'INSERT INTO posts(user_id, body) VALUES(?, ?)';
                conn.query(sql, [userId, postBody], (error, result) => {
                    if(error) res.send(error.message);
                    else res.send(result);
                });
            } else res.send(error.message);
        });
    } else res.send({});
});

/* Get user info */
app.get('/getUserInfo/:id', (req, res) => {
    const id = req.params;
    let sql = 'SELECT username FROM users WHERE users.id = ?';
    conn.query(sql, id.id, (error, result1) => {
        if(result1) {
            let sql = 'SELECT posts.id, body, userId, username FROM posts, users WHERE userId = ? and userId = users.id';
            conn.query(sql, id.id, (error, result2) => {
                if(error) res.send(error.message);
                res.send({username: result1[0].username, posts: result2});
            });
        } else res.send(error.message);
    });
});

