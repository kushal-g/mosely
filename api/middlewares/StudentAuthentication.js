const admin = require('../utils/base');
const chalk = require('chalk');

module.exports = (req, res, next) => {
	console.log(chalk.yellow('Checking authorization header...'));
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		let idToken = req.headers.authorization.split('Bearer ')[1];
		console.log(chalk.yellow('Verifying token...'));
		admin
			.auth()
			.verifyIdToken(idToken)
			.then(decodedToken => {
				if (decodedToken.role.student) {
					console.log(chalk.green('Student Authenticated!'));
					req.user = decodedToken;
					next();
				}
			})
			.catch(e => {
				console.log(chalk.red(e.message));
				res.status(401).json({
					statusCode: 401,
					data: {
						msg: e.message,
					},
				});
			});
	} else {
		console.log(chalk.red('Token not present'));
		res.status(401).json({
			statusCode: 401,
			data: {
				msg: 'Unauthorized',
			},
		});
	}
};
