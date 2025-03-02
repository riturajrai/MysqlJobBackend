const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(403).json({ error: "Access Denied" });
    }
    const token = authHeader.split(" ")[1]; 
    if (!token) {
        return res.status(403).json({ error: "Invalid Token Format" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token Access Denied" });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticate;
