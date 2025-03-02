const db = require('../Database/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) { 
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err.message });
    }

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result[0];

    console.log("🔹 Entered Password:", password);
    console.log("🔹 Stored Hashed Password:", user.password);
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔹 Password Match Status:", isMatch);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign(
        { user_id: user.user_id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token, user: { user_id: user.user_id, name: user.name, email: user.email } });
    } catch (compareError) {
      console.error("🔴 Error comparing passwords:", compareError);
      res.status(500).json({ error: "Internal server error while comparing passwords" });
    }
  });
};

module.exports = { login };
