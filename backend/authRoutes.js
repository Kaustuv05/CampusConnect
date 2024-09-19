const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    let table = role === 'student' ? 'students' : 'instructors';

    const sql = `SELECT * FROM ${table} WHERE username = ?`;
    db.query(sql, [username], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user });
    });
});

module.exports = router;