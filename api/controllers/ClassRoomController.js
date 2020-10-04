const chalk = require('chalk');
const classroom = require('../models/classroomModel');

module.exports.getCourses = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Getting courses...'));
		const courses = await classroom.getCourses(req.tokens);
		console.log(chalk.green('Got em!'));

		console.log(chalk.yellow('Fetching teacher details...'));
		for (let i = 0; i < courses.length; i++) {
			const teacherInfo = await classroom.getUserDetails(req.tokens, courses[i].ownerId);
			courses[i].teacherInfo = { ...teacherInfo };
		}
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
