const userDb = require('../models/userData');

module.exports = async (req, res, next) => {
	try {
		const tokens = await userDb.getTokens(req.user.uid);
		req.tokens = tokens;
		next();
	} catch (e) {
		next(e);
	}
};
