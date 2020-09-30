const express = require('express');
const AuthController = require('../controllers/authController');
const CheckAuthentication = require('../middlewares/TempAuthenticator.js');
const router = express.Router();

router.get('/link', CheckAuthentication, AuthController.getAuthLink);
router.post('/authorize', CheckAuthentication, AuthController.authorizeUser);

module.exports = router;
