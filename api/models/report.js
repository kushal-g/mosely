const db = require('../utils/base').firestore();

const reportDb = db.collection('reports');

module.exports.save = async ({ courseWorkId, report, lastUpdateTime, numSubmissions }) => {
	await reportDb.doc(courseWorkId).set({
		report,
		numSubmissions,
		lastUpdateTime,
		noneMatching: report.length === 0,
	});
};

module.exports.get = async courseWorkId => {
	const doc = await reportDb.doc(courseWorkId).get();
	return doc.data();
};

module.exports.delete = async courseWorkId => {
	await reportDb.doc(courseWorkId).delete();
};
