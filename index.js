const express = require('express'); 
const cors = require('cors'); 
const passport = require('passport'); // Authentication middleware
const session = require('express-session'); // Session management
require('dotenv').config(); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Google OAuth strategy

// Database and Models
const studentDB = require('./database/studentDB'); // Database connection
const User = require('./models/userModel'); // User model for MongoDB

// Controllers


// Routes
const studentRoutes = require('./routes/studentRoutes'); // Routes for student operations

const app = express(); // Create an Express application
const port = process.env.PORT || 80; // Define the port

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

// Passport Configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // Google Client ID from environment variables
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret from environment variables
  callbackURL: "/auth/google/callback", // URL to redirect to after authentication
  scope: ["profile", "email"] // Scope of access
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Find existing user by Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user); // User exists, return user
    }

    // Create new user if not found
    user = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });

    await user.save(); // Save new user to database
    done(null, user); // Return new user
  } catch (error) {
    done(error, null); // Handle errors
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find user by ID
    done(null, user); // Return user object
  } catch (error) {
    done(error, null); // Handle errors
  }
});

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









// Google Authentication Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] })); // Start Google OAuth flow

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }), // Redirect to login on failure
  (req, res) => {
    res.redirect('http://localhost:3000/dashboard'); // Redirect to dashboard on success
  }
  
  
);



app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed'); // Handle logout errors
    }
    res.redirect('/'); // Redirect to home on success
  });
});

// MongoDB Connection
studentDB(); // Connect to the database

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // Log server start
});



const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);