const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all departments
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Create a new department
router.post('/', (req, res) => {
    const { name, head_id } = req.body;
    const sql = 'INSERT INTO departments (name, head_id) VALUES (?, ?)';
    db.query(sql, [name, head_id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Department added successfully', id: result.insertId });
    });
});

// Update a department
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, head_id } = req.body;
    const sql = 'UPDATE departments SET name = ?, head_id = ? WHERE id = ?';
    db.query(sql, [name, head_id, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Department updated successfully' });
    });
});

// Delete a department
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM departments WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Department deleted successfully' });
    });
});

module.exports = router;