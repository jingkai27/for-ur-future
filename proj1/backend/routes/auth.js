const express = require('express');
const router = express.Router();
const db = require('../database');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// router.post('/register', (banana, coconut) => {
//     // check if this the user exists already 
//     const user = db.prepare('SELECT * FROM users WHERE username = ?').get(banana.body.username)
//     if (user) {
//         coconut.status(409).send("User already exists")
//     } else {
//         // then i can create a new account for the person
//         const user_password = banana.body.password
//         // first i need to prepare the insert statement - sql plus question marks. this is an
//         // INSERT statment 
//         const insert = db.prepare('INSERT INTO users(username, password_hash) VALUES(?,?)')
//         const salt = bcrypt.getSaltSync(10)
//         const hashPassword = bcrypt.hashSync(user_password, salt)
//         insert.run(banana.body.username, hashPassword)
//         coconut.status(201).send("User added successfully")
//     }
// })

// Prepare an INSERT statement
router.post('/register', (req, res) => {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username)
    if (user) {
        res.status(409).send("User already exists")
    } else {
        // check if username exists already
        const insert = db.prepare('INSERT INTO users(username, password_hash) VALUES(?,?)')
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        insert.run(req.body.username, hash)
        res.status(201).send("User added")
    }
});

router.post('/login', (req, res) => {
    // check if user exists
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(req.body.username)
    console.log(user)

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