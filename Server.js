require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const postRoutes = require("./controllers/Post");
const getUserRoutes = require("./controllers/Get");
const ProfileData = require("./controllers/Put");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Form-data support

// ✅ Static folder for image uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Use Routes
app.use("/api", postRoutes);
app.use("/api", getUserRoutes);
app.use("/api", ProfileData);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Server is running at http://localhost:${PORT}`);
});
