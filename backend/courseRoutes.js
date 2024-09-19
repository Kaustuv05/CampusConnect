const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all courses
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Create a new course
router.post('/', (req, res) => {
    const { name, department_id, instructor_id } = req.body;
    const sql = 'INSERT INTO courses (name, department_id, instructor_id) VALUES (?, ?, ?)';
    db.query(sql, [name, department_id, instructor_id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Course added successfully', id: result.insertId });
    });
});

// Update a course
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, department_id, instructor_id } = req.body;
    const sql = 'UPDATE courses SET name = ?, department_id = ?, instructor_id = ? WHERE id = ?';
    db.query(sql, [name, department_id, instructor_id, id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Course updated successfully' });
    });
});

// Delete a course
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM courses WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Course deleted successfully' });
    });
});

module.exports = router;