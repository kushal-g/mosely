const chalk = require('chalk');
const authModel = require('../models/authModel');
const userDb = require('../models/userData');
const classroom = require('../models/classroomModel');
const report = require('../models/report');

module.exports.getAuthLink = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Generating auth url...'));
		const authLink = authModel.getAuthLink();
		console.log(chalk.green('Generated!'));
		res.status(200).send({
			statusCode: 200,
			msg: 'Successfully generated auth link',
			data: {
				authLink,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports.authorizeUser = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Authorizing...'));
		const { tokens } = await authModel.confirmAuthorization(req.body.authCode);
		console.log(chalk.green('Authorized!'));
		console.log(chalk.yellow('Getting classroom id...'));
		const classRoomId = await classroom.getClassroomUserId(tokens);
		console.log(chalk.green('Got it!'));
		console.log(chalk.yellow('Saving tokens and id in db...'));
		await userDb.saveTokensAndClassroomId(req.user.uid, tokens, classRoomId);
		console.log(chalk.green('Saved!'));
		res.status(200).send({
			statusCode: 200,
			msg: 'Succesfully authorized',
		});
	} catch (e) {
		next(e);
	}
};

module.exports.unlinkUser = async (req, res, next) => {
	try {
		//Remove all reports as teacher first
		console.log(chalk.yellow('Getting courses...'));
		let courses = await classroom.getCourses(req.tokens);
		courses = courses.filter(course => course.teacherFolder); // Only get courses where user is teacher
		console.log(chalk.green('Getting!'));

		for (const course of courses) {
			console.log(chalk.yellow(`Getting course works for ${course.id}`));
			let courseWorks = await classroom.getCourseWork(req.tokens, course.id);
			console.log(chalk.green('Got it!'));
			let deleteReports = courseWorks.map(courseWork => report.delete(courseWork.id));
			console.log(chalk.yellow('Deleting reports...'));
			await Promise.all(deleteReports); //If another teacher has access to coursework, within next sync cycle, it'll come again
			console.log(chalk.green('Deleted!'));
		}

		//Revoke access tokens
		console.log(chalk.yellow('Revoking access tokens...'));
		await authModel.revokeTokens(req.tokens);

		//Remove user data from db
		console.log(chalk.green('Revoked!'));
		userDb.removeUserData(req.user.uid);
		res.status(200).send({
			statusCode: 200,
			msg: 'Successfully unlinked account',
		});
	} catch (e) {
		next(e);
	}
};

module.exports.isUserLinked = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Checking linked status...'));
		const isLinked = await userDb.isUserLinked(req.user.uid);
		console.log(chalk.green(isLinked ? 'Linked!' : 'Not Linked!'));
		res.status(200).send({
			statusCode: 200,
			msg: 'Succesfully retrieved linked status',
			data: {
				isLinked,
			},
		});
	} catch {
		next(e);
	}
};
