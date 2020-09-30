const authModel = require('../models/authModel');

module.exports.authorizeUser = async (req, res, next) => {
	try {
		console.log(req.body);
		await authModel.confirmAuthorization(req.body.authCode);
		res.status(200).send({
			msg: 'Succesfully authorized',
		});
	} catch (e) {
		//console.error(e);
		res.status(500).send({
			msg: e.message,
		});
	}
};
