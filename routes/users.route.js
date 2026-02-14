const express = require('express');
const route = express.Router();
const usersController = require("../controllers/users.controller");
const { auth } = require('../middleware/auth');
const { validateRegister, validateLogin } = require('../middleware/validators');
const { adminAuth } = require("../middleware/adminAuth");

route.post('/register', validateRegister, usersController.register);
route.post('/login', validateLogin, usersController.login);
route.get('/currentUser', auth, usersController.getCurrentUser);

route.post("/admin/create-user", adminAuth, usersController.createUser);
route.delete("/admin/delete-user/:id", adminAuth, usersController.deleteUser);

module.exports = route;