const express = require('express')
const {createClass,viewClasses,renameClass} = require('../controllers/TeacherController')
const {teacherAuthentication} = require('../controllers/AuthController')
const router = express.Router()

router.post('/class/create',teacherAuthentication,createClass)
router.post('/class/read',teacherAuthentication,viewClasses)
router.post('/class/update',teacherAuthentication,renameClass)

module.exports = router