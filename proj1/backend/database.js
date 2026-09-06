const Database = require('better-sqlite3');
const db = new Database('expenses.db');

db.exec(`
    CREATE TABLE expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT null, 
        amount REAL NOT null
    )`
);

console.log('Table created!');

module.exports = db