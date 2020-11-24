const admin = require('../utils/base');
const chalk = require('chalk');

module.exports = (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		let idToken = req.headers.authorization.split('Bearer ')[1];
		admin
			.auth()
			.verifyIdToken(idToken)
			.then(decodedToken => {
				req.user = decodedToken;
				next();
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
