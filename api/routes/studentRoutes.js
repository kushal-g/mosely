const express = require('express');
const StudentController = require('../controllers/StudentController');

const router = express.Router();
const studentAuthentication = require('../middlewares/StudentAuthentication');

router.post('/class/add', studentAuthentication, StudentController.addToClass);

module.exports = router;
