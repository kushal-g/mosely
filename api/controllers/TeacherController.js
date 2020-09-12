const admin = require('../utils/base');
const chalk = require('chalk');
const teachersDb = require('../models/teachers');
const coursesDb = require('../models/courses');
const classesDb = require('../models/classes');
const courseAssignmentsDb = require('../models/courseAssignments');
const classAssignmentsDb = require('../models/classAssignments');
const languagesAllowed = require('../models/languagesAllowed');

module.exports.searchTeacher = async (req, res, next) => {
	try {
		const { searchTerm } = req.body;
		const teachers = await teachersDb.searchTeacherByName(searchTerm);
		res.status(200).send({
			statusCode: 200,
			data: {
				teachers,
			},
		});
	} catch (e) {
		console.error(e, chalk.red(e.message));
		res.status(500).send({
			statusCode: 500,
			msg: e.message,
		});
	}
};

module.exports.addTeacherToCourse = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Adding teacher to course...'));
		await coursesDb.addTeacher({ uid: req.user.uid, ...req.body });
		console.log(chalk.green('Added!'));
		res.status(200).send({
			statusCode: 200,
			msg: 'Successfully added teacher to course',
		});
	} catch (e) {
		console.error(e, chalk.red(e.message));
		res.status(500).send({
			statusCode: 500,
			msg: e.message,
		});
	}
};

module.exports.createCourse = (req, res, next) => {
	const { courseName, courseCode, courseDesc } = req.body;
	coursesDb
		.createCourse(req.user, courseCode, courseName, courseDesc)
		.then(() => {
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully created a course',
				},
			});
		})
		.catch(e =>
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message,
				},
			})
		);
};

module.exports.viewCourse = (req, res, next) => {
	try {
		coursesDb.viewCourse(req.user.uid).then(courses => {
			console.log;
			courses.sort((a, b) => a.dateCreated._seconds - b.dateCreated._seconds).reverse();
			console.log(courses);
			console.log(chalk.green('Got courses'));
			res.status(200).send({
				statusCode: 200,
				data: {
					courses: courses,
				},
			});
		});
	} catch (e) {
		console.log(chalk.red(e.message));
		res.status(500),
			send({
				statusCode: 500,
				data: {
					msg: e.message,
				},
			});
	}
};

module.exports.editCourse = (req, res, next) => {
	console.log(chalk.yellow('Renaming course...'));

	const { courseId, courseName, courseCode, courseDesc } = req.body;

	coursesDb
		.editCourse(courseId, req.user.uid, courseCode, courseName, courseDesc)
		.then(() => {
			console.log(chalk.green('Successfully renamed course'));
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully renamed course',
				},
			});
		})
		.catch(e => {
			res.status(500).send({
				statusCode: 500,
				data: {
					statusCode: 500,
					data: {
						msg: e.message,
					},
				},
			});
		});
};

module.exports.deleteCourse = (req, res, next) => {
	console.log(chalk.yellow('Deleting course...'));
	coursesDb
		.deleteCourse(req.user.uid, req.body.courseId)
		.then(() => {
			console.log(chalk.green('Successfully deleted course'));
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully deleted course',
				},
			});
		})
		.catch(e => {
			res.status(500).send({
				statusCode: 500,
				data: {
					statusCode: 500,
					data: {
						msg: e.message,
					},
				},
			});
		});
};

module.exports.createClass = (req, res, next) => {
	console.log(chalk.yellow('Creating class...'));
	const { className, courseId } = req.body;
	classesDb
		.createClass(courseId, className, req.user.uid)
		.then(classId => {
			console.log(chalk.green('Created class'));
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully created class',
					classId: classId,
				},
			});
		})
		.catch(e => {
			console.log(chalk.red(e.message));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message,
				},
			});
		});
};

module.exports.viewClassOfCourse = (req, res, next) => {
	const { courseId } = req.body;
	console.log(chalk.yellow('Getting classes...'));
	classesDb
		.viewClassesOfCourse(courseId)
		.then(classes => {
			console.log(chalk.green('Got classes'));
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully fetched classes',
					classes: classes,
				},
			});
		})
		.catch(e => {
			console.log(chalk.red(e.message));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message,
				},
			});
		});
};

module.exports.deleteClass = (req, res, next) => {
	const { courseId, classId } = req.body;
	console.log();
	classesDb
		.deleteClass(courseId, classId, req.user.uid)
		.then(() => {
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully deleted the class',
				},
			});
		})
		.catch(e => {
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e || e.message,
				},
			});
		});
};

module.exports.editClass = (req, res, next) => {
	console.log(chalk.yellow('Editing class...'));
	const { courseId, classId, className } = req.body;
	classesDb
		.editClass(courseId, classId, className, req.user.uid)
		.then(() => {
			console.log(chalk.green('Edited class'));
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully edited class',
				},
			});
		})
		.catch(e => {
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message || e,
				},
			});
		});
};

module.exports.createCourseAssignment = (req, res, next) => {
	//console.log(req.body)
	console.log(req.file);
	if (languagesAllowed.indexOf(req.body.language) != -1) {
		courseAssignmentsDb
			.createAssignment({
				...req.body,
				attachment: req.file,
				uid: req.user.uid,
			})
			.then(id => {
				res.status(200).send({
					statusCode: 200,
					data: {
						msg: 'Successfully added assignment',
						assignmentId: id,
					},
				});
			})
			.catch(e => {
				console.log(chalk.red(e || e.message));
				res.status(500).send({
					statusCode: 500,
					data: {
						msg: e.message || e,
					},
				});
			});
	} else {
		res.status(400).send({
			statusCode: 400,
			data: {
				msg: 'Language not supported',
			},
		});
	}
};

module.exports.getCourseAssignments = (req, res, next) => {
	courseAssignmentsDb
		.getAssignments({ ...req.body, uid: req.user.uid })
		.then(assignments => {
			res.status(200).send({
				statusCode: 200,
				data: {
					courseAssignments: assignments,
					msg: 'Successfully retrieved course assignments',
				},
			});
		})
		.catch(e => {
			console.log(chalk.red(e || e.message));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message || e,
				},
			});
		});
};

module.exports.deleteCourseAssignment = (req, res, next) => {
	console.log(req.body);
	courseAssignmentsDb
		.deleteAssignment({ ...req.body, uid: req.user.uid })
		.then(() => {
			res.status(200).send({
				statusCode: 200,
				data: {
					msg: 'Successfully deleted course assignment',
				},
			});
		})
		.catch(e => {
			console.log(chalk.red(e));
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e,
				},
			});
		});
};

module.exports.createClassAssignment = async (req, res, next) => {
	try {
		if (languagesAllowed.indexOf(req.body.language) != -1) {
			console.log(chalk.yellow('Creating class assignment...'));
			await classAssignmentsDb.createAssignment({
				...req.body,
				uid: req.user.uid,
				attachment: req.file,
			});
			console.log(chalk.green('Created!'));
			res.status(200).send({
				statusCode: 200,
				msg: 'Successfully created class assignment',
			});
		} else {
			console.log(chalk.red('Language unsupported'));
			res.status(400).send({
				statusCode: 400,
				data: {
					msg: 'Language not supported',
				},
			});
		}
	} catch (e) {
		console.error(e, chalk.red(e.message));
		res.status(500).send({
			statusCode: 500,
			msg: e.message,
		});
	}
};

module.exports.deleteClassAssignment = async (req, res, next) => {
	try {
		await classAssignmentsDb.deleteAssignment({ ...req.body, uid: req.user.uid });
		res.status(200).send({
			statusCode: 200,
			data: {
				msg: 'Successfully deleted class assignment',
			},
		});
	} catch (e) {
		console.error(chalk.red(e.message), e);
		res.status(500).send({
			statusCode: 500,
			data: {
				msg: e.message || e,
			},
		});
	}
};

module.exports.getClassAssignments = (req, res, next) => {
	classAssignmentsDb
		.getAssignments({ ...req.body, uid: req.user.uid })
		.then(assignments => {
			res.status(200).send({
				statusCode: 200,
				data: {
					classAssignments: assignments,
					msg: 'Successfully retrieved class assignments',
				},
			});
		})
		.catch(e => {
			console.error(chalk.red(e.message), e);
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message,
				},
			});
		});
};
