const db = require('../utils/base').firestore();

const userDb = db.collection('users');

module.exports.saveTokensAndClassroomId = async (uid, tokens, classRoomId) => {
	await userDb.doc(uid).create({
		tokens,
		classRoomId,
	});
};

module.exports.isUserLinked = async uid => {
	const doc = await userDb.doc(uid).get();
	return doc.data === undefined ? false : true;
};
