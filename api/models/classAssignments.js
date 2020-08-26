const admin = require('../utils/base');
const chalk = require('chalk');
const db = admin.firestore();
const bucket = admin.storage().bucket();

const courseDb = db.collection('courses');

module.exports.createAssignment = async ({
	uid,
	courseId,
	classId,
	name,
	dueDate,
	description,
	language,
	attachment,
}) => {
	console.log({
		uid,
		courseId,
		classId,
		name,
		dueDate,
		description,
		language,
		attachment,
	});
	const docRef = courseDb.doc(courseId).collection('classes').doc(classId);
	const classData = await docRef.get();

	console.log(chalk.yellow('Checking if teacher is class coordinator...'));

	if (classData.data().classCoordinator == uid) {
		console.log(chalk.green('Teacher is class coordinator!'));

		const fileName = `${courseId}/${classId}/${Date.now()}-${attachment.originalname}`;

		console.log('Generated file name: ', fileName);
		console.log(chalk.yellow('Saving file to bucket...'));

		await bucket.file(fileName).save(attachment.buffer);

		console.log(chalk.green('File saved to bucket'));
		const { buffer, ...rest } = attachment;
		console.log(chalk.yellow('Saving to firebase...'));

		const assignmentRef = await docRef.collection('assignments').add({
			name,
			description,
			language,
			dueDate: new Date(Number(dueDate)),
			attachment: { ...rest, gcs_fileName: fileName },
			isExpired: false,
			isDeleted: false,
		});

		console.log(chalk.green('Saved to firebase'));
		return assignmentRef.id;
	} else {
		throw new Error('Unauthorized to add assignment to this course');
	}
};
