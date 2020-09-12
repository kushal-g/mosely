const express = require('express');
const multer = require('multer');

const TeacherController = require('../controllers/TeacherController');
const { teacherAuthentication } = require('../controllers/AuthController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/search', TeacherController.searchTeacher);

/* Course routes*/
router.post('/course', teacherAuthentication, TeacherController.createCourse);
router.post('/course/read', teacherAuthentication, TeacherController.viewCourse);
router.post('/course/update', teacherAuthentication, TeacherController.editCourse);
router.post('/course/delete', teacherAuthentication, TeacherController.deleteCourse);
router.post('/course/teachers/add', teacherAuthentication, TeacherController.addTeacherToCourse);

/*Class routes */
router.post('/course/class', teacherAuthentication, TeacherController.createClass);
router.post('/course/class/read', teacherAuthentication, TeacherController.viewClassOfCourse);
router.post('/course/class/update', teacherAuthentication, TeacherController.editClass);
router.post('/course/class/delete', teacherAuthentication, TeacherController.deleteClass);

/*Course level assignment routes */
router.post(
	'/course/assignment',
	teacherAuthentication,
	upload.single('attachment'),
	TeacherController.createCourseAssignment
);
router.post(
	'/course/assignment/read',
	teacherAuthentication,
	TeacherController.getCourseAssignments
);
router.post(
	'/course/assignment/delete',
	teacherAuthentication,
	TeacherController.deleteCourseAssignment
);

/*Class level assignments route */
router.post(
	'/course/class/assignment/create',
	teacherAuthentication,
	upload.single('attachment'),
	TeacherController.createClassAssignment
);

router.post(
	'/course/class/assignment/delete',
	teacherAuthentication,
	TeacherController.deleteClassAssignment
);

router.post(
	'/course/class/assignment/read',
	teacherAuthentication,
	TeacherController.getClassAssignments
);
module.exports = router;
