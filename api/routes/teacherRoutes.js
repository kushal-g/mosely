const express = require('express')
const {createClass,viewClasses} = require('../controllers/TeacherController')
const {teacherAuthentication} = require('../controllers/AuthController')
const router = express.Router()

router.post('/class/create',teacherAuthentication,createClass)
router.post('/class/read',teacherAuthentication,viewClasses)

module.exports = router