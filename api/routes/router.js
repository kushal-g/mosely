const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/authorize', AuthController.authorizeUser);

module.exports = router;
