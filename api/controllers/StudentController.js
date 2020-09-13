const chalk = require('chalk');
const students = require('../models/students');

module.exports.addToClass = async (req, res, next) => {
	try {
		await students.addToClass({ uid: req.user.uid, ...req.body });
		res.status(200).send({
			statusCode: 200,
			msg: 'Successfully added Student to class',
		});
	} catch (e) {
		console.error(e, chalk.red(e.message));
		res.status(500).send({
			statusCode: 500,
			msg: e.message,
		});
	}
};

module.exports.viewClasses = async (req, res, next) => {
	try {
		const classes = await students.viewClasses(req.user.uid);
		res.status(200).send({
			statusCode: 200,
			msg: 'Successfully retrieved classes',
			data: {
				classes,
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

module.exports.getAssignments = async (req, res, next) => {
	try {
		const data = await students.getAssignments({ ...req.body });
		res.status(200).send({
			statusCode: 200,
			msg: 'Successfully retrieved assignments',
			data,
		});
	} catch (e) {
		console.error(e, chalk.red(e.message));
		res.status(500).send({
			statusCode: 500,
			msg: e.message,
		});
	}
};
