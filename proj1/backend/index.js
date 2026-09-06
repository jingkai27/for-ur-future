//index.js is the entrypoint to a sqlite3 app

const express = require('express');
const app = express();
const expenseRoutes = require('./routes/expense');

app.use(express.json());
app.use('/api/expenses', expenseRoutes)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))