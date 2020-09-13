const admin = require('../utils/base');
const chalk = require('chalk');
const teachersDb = require('../models/teachers');
const studentsDb = require('../models/students');

module.exports.createTeacher = (req, res, next) => {
	console.log(chalk.yellow('Setting account to teacher...'));
	console.log(req.body);
	admin
		.auth()
		.getUserByEmail(req.user.email)
		.then(user =>
			admin.auth().setCustomUserClaims(user.uid, {
				role: {
					teacher: true,
					student: false,
				},
			})
		)
		.then(() => {
			console.log(chalk.green('Account set to teacher'));
			return admin.auth().getUserByEmail(req.user.email);
		})
		.then(user => {
			admin.auth().updateUser(user.uid, {
				displayName: req.body.name,
			});
		})
		.then(() => {
			const { name, mossId } = req.body;
			return teachersDb.createTeacherEntry(req.user.uid, name, mossId);
		})
		.then(() => {
			res.status(200).send({
				statusCode: 200,
				data: {
					message: 'Successfully created Teacher Account',
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

module.exports.createStudent = (req, res, next) => {
	console.log(chalk.yellow('Setting account to student...'));
	console.log(req.body);
	admin
		.auth()
		.getUserByEmail(req.user.email)
		.then(user =>
			admin.auth().setCustomUserClaims(user.uid, {
				role: {
					teacher: false,
					student: true,
				},
			})
		)
		.then(() => {
			console.log(chalk.green('Account set to student'));
			return admin.auth().getUserByEmail(req.user.email);
		})
		.then(user => {
			admin.auth().updateUser(user.uid, {
				displayName: req.body.name,
			});
		})
		.then(() => {
			const { name, usn } = req.body;
			return studentsDb.createStudentEntry(req.user.uid, name, usn);
		})
		.then(() => {
			res.status(200).send({
				statusCode: 200,
				data: {
					message: 'Successfully created Student Account',
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

module.exports.checkRole = (req, res, next) => {
	admin
		.auth()
		.getUserByEmail(req.body.email)
		.then(user => {
			res.status(200).send({
				statusCode: 200,
				data: {
					role: user.customClaims.role,
				},
			});
		})
		.catch(e => {
			res.status(500).send({
				statusCode: 500,
				data: {
					msg: e.message,
				},
			});
		});
};
