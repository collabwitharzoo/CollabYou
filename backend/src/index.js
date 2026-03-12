require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// API routes
app.use('/api/auth',         require('./routes/auth'));
app.use('/api/apply',        require('./routes/apply'));
app.use('/api/applications', require('./routes/applications'));

// Serve admin dashboard
app.use('/admin', express.static(path.join(__dirname, '../admin')));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
