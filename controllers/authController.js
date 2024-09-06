const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming you have a user model
const passport = require('passport');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// User Signup
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Create a token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // Create a token
        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Google OAuth Authentication
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google OAuth Callback
const googleAuthCallback = (req, res) => {
    // This is handled automatically by passport, no need for manual token creation
    res.redirect('/'); // Redirect to home page or dashboard
};

// Exporting the controllers
module.exports = {
    signup,
    login,
    googleAuth,
    googleAuthCallback
};
