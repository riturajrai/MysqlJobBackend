const db = require("../Database/database"); // Database Connection
const bcrypt = require("bcryptjs");

// Signup Function
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    // 🔹 Check if user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }
        // 🔹 Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Insert user into database
        const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [name, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error", details: err.message });
            }

            res.status(201).json({
                message: "Signup successful",
                userId: result.insertId, // 🔹 Return generated user ID
            });
        });
    });
};

module.exports = { signupUser }; // Exporting function
