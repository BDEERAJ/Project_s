const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Points } = require('./models'); 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']; 
    if (!token) return res.status(401).json({ message: 'No token provided' });
    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {        
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
};

router.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/@gmail\.com$/.test(email)) {
        return res.status(400).json({ message: 'Email must be a valid Gmail address' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = generateToken(newUser._id);

        res.status(201).json({ message: 'User registered successfully', token, userId: newUser._id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' });

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = generateToken(user._id);
        res.status(200).json({ message: 'Login successful', token, userId: user._id });
    } catch {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/api/profile', authMiddleware, async (req, res) => {
    try {
        const u = await User.findById(req.userId);
        if (!u) return res.status(404).json({ message: 'User not found' });        
        const email = u.email;
        let user = await Points.findOne(
            { email }
        );
        if (!user) {
            let val= new Points({ email, total: 0, correct: 0 });
            await val.save();
            user = val;
        }
        return res.json({
            message: `Welcome user ${req.userId}`,
            email: email,
            username: u.username,
            total: parseInt(user.total) || 0,
            correct: parseInt(user.correct) || 0
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;