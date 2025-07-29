import { Router } from "express";
import { User, Teacher } from '../Database/schema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const generateToken = (payload) => {
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET, 
        { expiresIn: '1d' } 
    );
    return token;
};

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, uniqueId, passkey } = req.body;

        if (!(name && email && password && uniqueId && passkey)) {
            console.log('Received undefined fields:', { name, email, password, uniqueId, passkey });
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'A user with this email already exists.' });
        }

        const newTeacherProfile = new Teacher({ name, uniqueId, passkey });
        const savedTeacherProfile = await newTeacherProfile.save();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'teacher',
            profileId: savedTeacherProfile._id,
            roleModel: 'Teacher'
        });
        const savedUser = await newUser.save();

        const payload = { id: savedUser._id, email: savedUser.email, role: savedUser.role };
        const token = generateToken(payload);

        res.status(201).json({ message: 'Teacher registered successfully!', token });

    } catch (error) {
        console.error('Teacher Signup Error:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        // CORRECTED: Destructure from req.body, not req
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });

        if (!user || user.role !== 'teacher') {
            return res.status(401).json({ message: 'Invalid credentials or user not found.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = { id: user._id, email: user.email, role: user.role };
        const token = generateToken(payload);

        res.status(200).json({ message: 'Login successful!', token });

    } catch (error) {
        console.error('Teacher Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

export default router;
