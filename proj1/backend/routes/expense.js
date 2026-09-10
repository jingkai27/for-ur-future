const express = require('express');
const router = express.Router();
const db = require('../database');

// Prepare an INSERT statement
router.post('/', (req, res) => {
    const insert = db.prepare('INSERT INTO expenses(description, amount) VALUES(?,?)')
    insert.run(req.body.description, req.body.amount)
    res.status(201).send("Expense added")
});

// Writing a SELECT ALL statement
router.get('/', (req, res) => {
    const select = db.prepare('SELECT * FROM expenses');
    const rows = select.all();
    res.status(200).json(rows);
})

// Writing an UPDATE statement
router.put('/:id', (req, res) => {
    const update = db.prepare("UPDATE expenses SET description = ?, amount = ? WHERE id = ?");
    update.run(req.body.description, req.body.amount, req.params.id);
    res.status(201).send("Expense Updated")
})

// Writing a DELETE statement
router.delete('/:id', (req, res) => {
    const del = db.prepare('DELETE FROM expenses WHERE id = ?');
    del.run(req.params.id);
    res.status(201).send("Expense deleted");
})

// Writing a SELECT BY DESCRIPTION statement
router.get('/:id', (req, res) => {
    const selectById = db.prepare('SELECT * FROM expenses WHERE id = ?');
    const row = selectById.get(req.params.id);
    res.status(200).json(row);
})

module.exports = router