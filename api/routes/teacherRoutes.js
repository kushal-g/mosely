const express = require('express')
const {createClass} = require('../controllers/TeacherController')
const {teacherAuthentication} = require('../controllers/AuthController')
const router = express.Router()

router.post('/class/create',teacherAuthentication,createClass)

module.exports = router