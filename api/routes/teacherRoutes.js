const express = require('express')
const multer = require('multer')

const TeacherController = require('../controllers/TeacherController')
const {teacherAuthentication} = require('../controllers/AuthController')

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({storage:storage})

router.post('/course',teacherAuthentication,TeacherController.createCourse)
router.post('/course/read',teacherAuthentication,TeacherController.viewCourse)
router.post('/course/update',teacherAuthentication,TeacherController.editCourse)
router.post('/course/delete',teacherAuthentication,TeacherController.deleteCourse)

router.post('/course/class',teacherAuthentication,TeacherController.createClass)
router.post('/course/class/read',teacherAuthentication,TeacherController.viewClassOfCourse)
router.post('/course/class/delete',teacherAuthentication,TeacherController.deleteClass)
router.post('/course/class/update',teacherAuthentication,TeacherController.editClass)

router.post('/course/assignment',teacherAuthentication,upload.single('attachment'),TeacherController.createCourseAssignment)
router.post('/course/assignment/delete',teacherAuthentication,TeacherController.deleteCourseAssignment)

module.exports = router