const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/freefireTopup', require('./routes/freefire'));
app.use('/api/mobileLegendsTopup', require('./routes/mobileLegends'));
app.use('/api/pubgMobileTopup', require('./routes/pubgMobile'));
app.use('/api/valorantTopup', require('./routes/valorant'));
app.use('/api/genshinImpactTopup', require('./routes/genshinImpact'));
app.use('/api/apexLegendsTopup', require('./routes/apexLegends'));
app.use('/api/robloxTopup', require('./routes/roblox'));
app.use('/api/lolTopup', require('./routes/lol'));
app.use('/api', require('./routes/topup'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all handler: send back index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
