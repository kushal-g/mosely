const express = require('express');
const ClassroomController = require('../controllers/ClassRoomController');
const CheckAuthentication = require('../middlewares/CheckAuthentication');
const GetAccessTokens = require('../middlewares/GetAccessTokens');
const router = express.Router();

router.get('/courses', CheckAuthentication, GetAccessTokens, ClassroomController.getCourses);
router.get(
	'/courses/courseWork',
	CheckAuthentication,
	GetAccessTokens,
	ClassroomController.getCourseWork
);
router.get(
	'/course/read',
	CheckAuthentication,
	GetAccessTokens,
	ClassroomController.getSingleCourse
);

module.exports = router;
