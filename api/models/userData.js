const db = require('../utils/base').firestore();
const chalk = require('chalk');
const userDb = db.collection('users');

module.exports.getUsersWithMoss = async () => {
	const query = await userDb.where('mossId', '>', '').get();
	const users = [];
	query.forEach(doc => users.push(doc.data()));
	return users;
};

module.exports.saveMossId = async (uid, mossId) => {
	await userDb.doc(uid).update({
		mossId,
	});
};

module.exports.getMossId = async uid => {
	const doc = await userDb.doc(uid).get();
	return doc.data().mossId ? doc.data().mossId : false;
};

module.exports.saveTokensAndClassroomId = async (uid, tokens, classRoomId) => {
	await userDb.doc(uid).create({
		tokens,
		classRoomId,
	});
};

module.exports.isUserLinked = async uid => {
	const doc = await userDb.doc(uid).get();
	return doc.data() === undefined ? false : true;
};

module.exports.getTokens = async uid => {
	console.log(chalk.yellow('Fetching access tokens...'));
	const doc = await userDb.doc(uid).get();
	console.log(chalk.green('Fetched!'));
	return doc.data().tokens;
};

module.exports.removeUserData = async uid => {
	await userDb.doc(uid).delete();
};
