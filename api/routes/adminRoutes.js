const express = require('express');
const Authcontroller = require('../controllers/AuthController');
const CheckAuthentication = require('../middlewares/CheckAuthentication');

const router = express.Router();

const { createTeacher, createStudent, checkRole } = Authcontroller;

router.post('/role', checkRole);

router.post('/teacher/create', CheckAuthentication, createTeacher);
router.post('/student/create', CheckAuthentication, createStudent);

module.exports = router;
