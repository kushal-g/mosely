const express = require('express')
const TeacherController = require('../controllers/TeacherController')
const {teacherAuthentication} = require('../controllers/AuthController')
const router = express.Router()

router.post('/class/create',teacherAuthentication,TeacherController.createClass)
router.post('/class/read',teacherAuthentication,TeacherController.viewClasses)
router.post('/class/update',teacherAuthentication,TeacherController.renameClass)
router.post('/class/delete',teacherAuthentication,TeacherController.deleteClass)
router.post('/class/assignment/create',teacherAuthentication,TeacherController.createAssignment)

module.exports = router