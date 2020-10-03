const db = require('../utils/base').firestore();

const reportDb = db.collection('reports');

module.exports.save = async (courseWorkId, report) => {
	await reportDb.doc(courseWorkId).set({
		report,
		noneMatching: report.length === 0,
	});
};
