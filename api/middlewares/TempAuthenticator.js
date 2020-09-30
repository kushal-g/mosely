module.exports = (req, res, next) => {
	req.user = {
		uid: 'abcdefghi',
	};
	next();
};
