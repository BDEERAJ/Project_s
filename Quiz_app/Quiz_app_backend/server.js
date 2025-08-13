const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./auth');
const dataRoutes = require('./data');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

app.use(authRoutes);
app.use(dataRoutes);

app.listen(3000);