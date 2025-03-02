
const expres = require('express');
const Router = expres.Router();
const authenticate = require('../middleware/authenticateToken')
const Profile = require('../UserProfile/Profile')
Router.put('/users/:id' , authenticate, Profile )

module.exports =  Router;