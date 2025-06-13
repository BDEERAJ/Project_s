const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.Mongo_url);
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
}));
const points = mongoose.model('points', new mongoose.Schema({ email: String, total: Number, correct: Number }));
const db = mongoose.model('db', { topic: String, content: String }, 'content_dbs');
const moreinfos = mongoose.model('moreinfos', { topic: String, content: String }, 'moreinfos');
const fd = mongoose.model('fd', { rev: String }, 'feedback');

// JWT Helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

// Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Routes

// Register
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  if (!/@gmail\.com$/.test(email))
    return res.status(400).json({ message: 'Email must be a valid Gmail address' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });
    const token = generateToken(newUser._id);

    res.status(201).json({ message: 'User registered successfully', token, userId: newUser._id });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
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

// Update Points
app.put('/result/points', async (req, res) => {
  try {
    const { email, tot, crt } = req.body;

    if (!email || tot == null || crt == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let user = await points.findOne({ email });

    if (user) {
      await points.updateOne(
        { email },
        { $set: { total: parseInt(user.total) + parseInt(tot), correct: parseInt(user.correct) + parseInt(crt) } }
      );
    } else {
      await points.create({ email, total: tot, correct: crt });
    }

    res.status(200).json({ message: "Points updated successfully" });
  } catch {
    res.status(500).json({ error: "Server Error" });
  }
});

// Profile
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const u = await User.findById(req.userId);
    if (!u) return res.status(404).json({ message: 'User not found' });

    const email = u.email;
    let user = await points.findOne({ email });

    if (user) {
      return res.json({
        message: `Welcome user ${req.userId}`,
        email,
        username: u.username,
        total: parseInt(user.total),
        correct: parseInt(user.correct)
      });
    } else {
      await points.create({ email, total: 0, correct: 0 });
      return res.json({
        message: `Welcome user ${req.userId}`,
        username: u.username,
        total: 0,
        correct: 0
      });
    }
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// Feedback
app.put('/feedback', async (req, res) => {
  const { rev } = req.body;
  try {
    const newFeedback = new fd({ rev });
    await newFeedback.save();
    res.status(200).send({ message: 'Feedback saved' });
  } catch {
    res.status(500).send({ error: 'Failed to save feedback' });
  }
});

// Content & MoreInfo
app.get('/:slug', async (req, res) => {
  const tpc = req.params.slug;
  let arr = tpc.split(':');

  try {
    if (arr[0] === 'content' && arr.length > 1) {
      const obj = await moreinfos.findOne({ topic: arr[1] });
      if (obj) return res.send(obj);
      else return res.status(404).send({ message: 'Moreinfo not found' });
    } else {
      const obj = await db.findOne({ topic: tpc });
      if (obj) return res.send(obj);
      else return res.status(404).send({ message: 'Content not found' });
    }
  } catch {
    res.status(500).send({ error: 'Error retrieving content' });
  }
});

// Quiz Data
app.get('/quiz/:slug', async (req, res) => {
  const collectionName = req.params.slug;
  try {
    const QuizModel = mongoose.models[collectionName] || mongoose.model(collectionName, {
      question: String,
      answer: String
    }, collectionName);

    const data = await QuizModel.find({});
    if (data) res.json(data);
    else res.status(404).send({ message: 'No quiz data found' });
  } catch {
    res.status(500).send({ error: 'Error fetching quiz data' });
  }
});

// Start Server
app.listen(3000);
