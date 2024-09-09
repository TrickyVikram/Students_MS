const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure this path is correct
const passport = require('passport');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// User Signup
const signup = async (req, res) => {
    console.log('Signup data:', req.body);
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
        console.log({ user: newUser, token });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            console.log({ msg: 'Invalid credentials: email' });
            return res.status(400).json({ msg: 'Invalid credentials: email' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log({ msg: 'Invalid credentials: password' });
            return res.status(400).json({ msg: 'Invalid credentials: password' });
        }

        // Create a JWT token if authentication is successful
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with the token
        res.status(200).json({ token });
        console.log(token); // Log the token for debugging

    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
};

// Google OAuth Authentication
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google OAuth Callback
const googleAuthCallback = (req, res) => {
    // This is handled automatically by passport, no need for manual token creation
    if (req.user) {
        // If user is authenticated, you can create a token or redirect as needed
        const token = jwt.sign({ email: req.user.email, id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
        // For example, you could redirect with a token or store the token in a cookie
        res.redirect(`/dashboard?token=${token}`);
    } else {
        // Redirect to login if the authentication failed
        res.redirect('/login');
    }
};

// Exporting the controllers
module.exports = {
    signup,
    login,
    googleAuth,
    googleAuthCallback
};
