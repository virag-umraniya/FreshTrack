const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../utils/validation');

// Sign-up route
router.post('/signup', signupValidation, authController.signup);

// Login route
router.post('/login', loginValidation, authController.login);

// Get user data (protected route)
router.get('/user', authController.authenticate, authController.getUser);

module.exports = router;