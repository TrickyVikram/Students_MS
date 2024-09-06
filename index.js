const express = require('express');
const cors = require('cors');
const studentDB = require('./database/studentDB');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  Credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Student Routes
app.use('/students', require('./routes/studentRoutes'));



app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(() => {
  console.log("auth api routes")
},
  authRoutes);

// MongoDb connection
studentDB();

// listening the server
app.listen(port, () => console.log(`Server is running at ${port}`));
