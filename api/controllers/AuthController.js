const chalk = require('chalk');
const authModel = require('../models/authModel');
const userDb = require('../models/userData');
const classroom = require('../models/classroomModel');

module.exports.getAuthLink = async (req, res, next) => {
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
};

module.exports.authorizeUser = async (req, res, next) => {
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
		msg: 'Succesfully authorized',
	});
};
