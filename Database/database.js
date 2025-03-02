const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "job_portal",
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed:", err.message);
    } else {
        console.log("✅ Database Connected Successfully!");
    }
});

module.exports = db;
