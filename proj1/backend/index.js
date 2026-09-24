//index.js is the entrypoint to a sqlite3 app

// most important thing to create an express backend
const express = require('express');
const path = require('path');
const requireAuth = require("./middleware/auth")
const app = express(); // new express app instance 
const expenseRoutes = require('./routes/expense');
const authRoutes = require('./routes/auth');

// app.use() configures how the application processes requests via middleware
// first one is built-in middleware function in express.js that parses incoming requests with JSON payloads and makes data available under req.body
app.use(express.json());
app.use('/api/expenses', requireAuth, expenseRoutes);
app.use('/api/auth', authRoutes);
// make all files in frontend folder available 
app.use(express.static(path.join(__dirname, '..', 'frontend'), { index: 'index.html' }));

// creating the port and the server for it to run, determines how the application starts up to accept requests
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))