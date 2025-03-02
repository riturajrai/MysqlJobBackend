const express = require('express');
const router = express.Router();
const db = require('../Database/database');

const updateProfile = (req, res) => {
    const { id } = req.params;
    const { name, email, phone, location, linkedin, github, resume } = req.body;
  
    const query = `
      UPDATE users 
      SET name = ?, email = ?, phone = ?, location = ?, linkedin = ?, github = ?, resume_link = ?
      WHERE user_id = ?
    `;
  
    db.query(query, [name, email, phone, location, linkedin, github, resume, id], (err, result) => {
      if (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ message: "Profile update failed" });
      }
      return res.json({ message: "Profile updated successfully!" });
    });
};

module.exports = updateProfile;
