const admin = require('../utils/base');
const chalk = require('chalk');
const db = admin.firestore();

module.exports.createTeacherEntry = (uid, name, mossId) => {
	let userRef = db.collection('teachers').doc(uid);
	console.log(chalk.yellow('Saving user details...'));
	return userRef
		.set({
			name: name,
			mossId: mossId,
			dateCreated: new Date(),
		})
		.then(() => {
			console.log(chalk.yellow('User details saved'));
		});
};

module.exports.getTeacher = uid => {
	return new Promise((resolve, reject) => {
		db.collection('teachers')
			.doc(uid)
			.get()
			.then(doc => resolve(doc.data()))
			.catch(e => reject(e.message));
	});
};

module.exports.searchTeacherByName = async fullName => {
	const end = fullName.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

	const queryDoc = await db
		.collection('teachers')
		.where('name', '>=', fullName)
		.where('name', '<', end)
		.orderBy('name')
		.get();
	const teachers = [];
	queryDoc.docs.forEach(doc => teachers.push({ teacherId: doc.id, ...doc.data() }));
	return teachers;
};
