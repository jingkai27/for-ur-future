const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Prepare an INSERT statement
router.post('/register', (req, res) => {
    const insert = db.prepare('INSERT INTO users(username, password_hash) VALUES(?,?)')
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    insert.run(req.body.username, hash)
    res.status(201).send("User added")
});

router.post('/login', (req, res) => {
    // check if user exists
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username)

    //if user does not exist, then return an error saying that user not found 
    if (!user) {
        return res.status(404).send("User not found")
    }
    // if user does exist, then check and compare password
    // how to check and compare password with bhash?
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password_hash)
    // if password is not valid, return an error saying that password not valid
    if (!isPasswordValid) {
        return res.status(401).send("Invalid password")
    }
    // if password is valid, then generate and return JWT 
    const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' })
    res.status(200).json({ token })
})

module.exports = router // important line