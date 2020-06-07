const express = require('express')
const TeacherController = require('../controllers/TeacherController')
const {teacherAuthentication} = require('../controllers/AuthController')
const router = express.Router()

router.post('/course',teacherAuthentication,TeacherController.createCourse)
router.post('/course/read',teacherAuthentication,TeacherController.viewCourse)
router.post('/course/update',teacherAuthentication,TeacherController.editCourse)
router.post('/course/delete',teacherAuthentication,TeacherController.deleteCourse)

router.post('/course/class',teacherAuthentication,TeacherController.createClass)
router.post('/course/class/read',teacherAuthentication,TeacherController.viewClassOfCourse)
router.post('/course/class/delete',teacherAuthentication,TeacherController.deleteClass)
router.post('/course/class/update',teacherAuthentication,TeacherController.editClass)

module.exports = router