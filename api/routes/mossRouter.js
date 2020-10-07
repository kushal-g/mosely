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

router.get('/reports/update', ReportController.incrementalSync);

router.get('/report', CheckAuthentication, ReportController.getReport);

module.exports = router;
