const Database = require('better-sqlite3');
const db = new Database('expenses.db');

db.exec(`
    CREATE TABLE if not exists expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT NOT null, 
        amount REAL NOT null
    ); 
    
    CREATE TABLE if not exists users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT NOT NULL UNIQUE, 
        password_hash TEXT NOT NULL
    )
    `
);
module.exports = db