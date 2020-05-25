const express = require('express')
const Authcontroller = require('../controllers/AuthController')

const router = express.Router()

const {CheckAuthentication, createTeacher, createStudent, checkRole} = Authcontroller;

router.post('/role',checkRole)

router.post("/teacher/create",CheckAuthentication,createTeacher)
router.post("/student/create",CheckAuthentication,createStudent)

module.exports = router