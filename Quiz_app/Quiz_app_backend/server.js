const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./auth');
const dataRoutes = require('./data');
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(dataRoutes);

app.listen(process.env.PORT || 3000);