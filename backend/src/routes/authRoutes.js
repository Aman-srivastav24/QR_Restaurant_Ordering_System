const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Post/auth/login
router.post('/login', authController.login);

module.exports = router;