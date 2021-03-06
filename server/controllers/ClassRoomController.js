const chalk = require('chalk');
const classroom = require('../models/classroomModel');

module.exports.getCourses = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Getting courses...'));
		const courses = await classroom.getCourses(req.tokens);
		console.log(chalk.green('Got em!'));

		console.log(chalk.yellow('Fetching teacher details...'));
		const teacherDetailsPromiseArray = []

		for (let i = 0; i < courses.length; i++) {
			teacherDetailsPromiseArray.push(classroom.getUserDetails(req.tokens, courses[i].ownerId));
		}

		const teacherDetails = await Promise.all(teacherDetailsPromiseArray)
		
		teacherDetails.map((teacherInfo,i)=>{
			courses[i].teacherInfo = { ...teacherInfo };
		})
		
		console.log(chalk.green('Fetched'));

		const data = {
			courses: {
				teacher: [],
				student: [],
			},
		};
		//console.log(data);
		courses.map(course =>
			course.teacherFolder
				? data.courses.teacher.push(course)
				: data.courses.student.push(course)
		);

		res.status(200).send({
			statusCode: 200,
			data,
		});
	} catch (e) {
		next(e);
	}
};

module.exports.getSingleCourse = async (req, res, next) => {
	try {
		const {
			tokens,
			query: { courseId },
		} = req;

		const course = await classroom.getSingleCourse(tokens, courseId);
		const teacherInfo = await classroom.getUserDetails(tokens, course.ownerId);

		course.teacherInfo = teacherInfo;

		res.status(200).send({
			statusCode: 200,
			data: {
				course,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports.getCourseWork = async (req, res, next) => {
	try {
		const {
			tokens,
			query: { courseId },
		} = req;
		console.log(chalk.yellow('Getting course work...'));
		const courseWork = await classroom.getCourseWork(tokens, courseId);
		console.log(chalk.green('Got it!'));
		res.status(200).send({
			statusCode: 200,
			data: {
				courseWork,
			},
		});
	} catch (e) {
		next(e);
	}
};
