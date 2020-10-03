const express = require('express');
const CheckAuthentication = require('../middlewares/CheckAuthentication');
const ReportController = require('../controllers/ReportController');
const GetAccessTokens = require('../middlewares/GetAccessTokens');
const router = express.Router();

router.post(
	'/id/update',
	CheckAuthentication,
	ReportController.saveMossId,
	GetAccessTokens,
	ReportController.initialSync
);

module.exports = router;
