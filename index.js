const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

// Database and Models
const studentDB = require('./database/studentDB'); // Database connection
const User = require('./models/userModel'); // User model for MongoDB

// Routes
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');

// Passport Configuration
require('./config/passport'); // Passport configuration (Google OAuth setup)

const app = express();
const port = process.env.PORT || 80;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: "GET,POST,PUT,DELETE", // Allow these methods
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200, // Status code for successful options request
};
app.use(cors(corsOptions)); // Apply CORS settings

// Session Management
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret', // Secret for signing cookies
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save new sessions
  cookie: { secure: false } // Set to true in production with HTTPS
}));

app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session

// Routes
app.use('/students', studentRoutes); // Use student routes
app.use('/auth', authRoutes); // Use authentication routes

app.use(authRoutes);
// MongoDB Connection
studentDB(); // Connect to the database

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // Log server start
});
