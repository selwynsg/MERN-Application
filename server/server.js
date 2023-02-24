require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const TWO_HOURS = 60 * 60 * 2 * 1000; 

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };
  
app.use(cors(corsOptions));
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_NAME)
const db = mongoose.connection
db.on('error', (error) => console.error(error));
db.once('connected', () => console.log("Hey you connected to Mongoose!"));

let cookie; 

app.use(express.json());

const subRouter = require('./routes/sub')
app.use('/sub',subRouter);

const sub2Router = require('./routes/info')
app.use('/info',sub2Router);


app.use(session({
    name: "myid",
    secret: 'super-duper-dummy-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: TWO_HOURS
    }
  }));

  app.post('/info/login/', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Validate user credentials
      const user = await validateUser(email, password);
  
      if (user) {
        // Create a new session
          req.session.userID = user._id;
          cookie = req.session.userID;
          console.log(req.session.userID);
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });
  
  
// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    console.log(req.session.userID);
    if (cookie != null) {
      next();
    } else {
      res.sendStatus(401);
    }
  }
  
async function validateUser(username, password) {
    try {
        const database = db.db;
        const users = database.collection("infos");
        const user = await users.findOne({ Email: username, Password: password });
        if (user) {
            return user;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

  // Protected route that requires authentication
  app.get('/info/autho/', isAuthenticated, (req, res) => {
    console.log(req.session.userID);
    res.sendStatus(200);
  });

  app.post('/info/logout/', (req, res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    cookie = null;
    res.sendStatus(200);
  });
  
  app.listen(28017, () => console.log('Listening on port 28017'));