
const express = require('express');
const passport = require('passport');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Local signup
router.post('/signup', signup);

// Local login
router.post('/login', login);

// Google OAuth login route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // On successful authentication, redirect to dashboard
    console.log(req.user);
    res.redirect('http://localhost:3000/dashboard');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;