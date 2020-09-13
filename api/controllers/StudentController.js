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
