const db = require('../Database/database');
const authenticateToken = require('../middleware/authenticateToken');

const getUserId = async (req, res) => {
    const { id } = req.params;

    // ✅ Ensure user can only access their own profile
    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ error: "Unauthorized Access" });
    }

    const query = "SELECT user_id, name, email, created_at FROM users WHERE user_id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(result[0]);
    });
};

module.exports = { getUserId };
