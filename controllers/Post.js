const express = require("express");
const Router = express.Router();
const { signupUser } = require("../UsersData/singup"); // Correct Import
const authenticate = require('../middleware/authenticateToken')
const {login} = require("../UsersData/login");
const {JobPost} = require('../JOBS LObby/Job')
const upload = require("../middleware/upload");
// Signup Route
Router.post('/signup', signupUser);
Router.post('/login',login)
Router.post("/jobs", upload.fields([{ name: "logo", maxCount: 1 }]), JobPost);




module.exports = Router;
