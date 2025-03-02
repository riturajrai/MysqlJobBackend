const express = require('express');
const router = express.Router();
const db = require('../Database/database'); 
const { getUserId } = require('../authRoutes/Id'); // Correct Import
const { JobLobby, Jobid } = require('../JOBS LObby/Job'); // Correct Import (Fixed Space Issue)
const authenticate = require('../middleware/authenticateToken');

// Protected route for getting own user details
router.get('/user/:id', authenticate, getUserId);

// Public routes for jobs
router.get('/jobs', JobLobby);
router.get('/jobs/:id', Jobid);

// Alternative GET route for user profile with additional fields
router.get('/users/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const query = 'SELECT user_id, name, email, location, phone, linkedin, github, resume_link, created_at FROM users WHERE user_id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(results[0]);
    });
});

router.get("/jobs/user/:userId", (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM jobs WHERE posted_by = ?";
  
    db.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.json(results);
    });
  });
  

module.exports = router;

