const express = require('express');
const AuthController = require('../controllers/authController');
const ReportController = require('../controllers/ReportController');
const CheckAuthentication = require('../middlewares/CheckAuthentication');
const GetAccessTokens = require('../middlewares/GetAccessTokens');
const router = express.Router();

router.get('/link', CheckAuthentication, AuthController.getAuthLink);
router.post('/authorize', CheckAuthentication, AuthController.authorizeUser);
router.post('/unlink', CheckAuthentication, GetAccessTokens, AuthController.unlinkUser);
router.get('/isLinked', CheckAuthentication, AuthController.isUserLinked);

module.exports = router;
