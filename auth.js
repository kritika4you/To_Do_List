// auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./users');
require('dotenv').config();

const router = express.Router();

// Signup route
router.post('/signup', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login route
router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;