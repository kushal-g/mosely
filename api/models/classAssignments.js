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

module.exports.getAssignments = async ({ uid, courseId, classId }) => {
	const docRef = courseDb.doc(courseId).collection('classes').doc(classId);
	const doc = await docRef.get();
	if (doc.data().classCoordinator === uid) {
		const querySnapshot = await docRef.collection('assignments').get();

		const assignments = [];
		const fileURLPromises = [];
		querySnapshot.forEach(document => {
			const { attachment, ...assignmentData } = document.data();

			if (!document.data().isDeleted) {
				const options = {
					version: 'v4',
					action: 'read',
					expires: Date.now() + 60 * 60 * 1000, //expires in one hour
				};

				fileURLPromises.push(bucket.file(attachment.gcs_fileName).getSignedUrl(options));

				assignments.push({
					...assignmentData,
					assignmentId: document.id,
					attachment: {
						mimetype: attachment.mimetype,
						originalname: attachment.originalname,
					},
				});
			}
		});
		const fileURLs = await Promise.all(fileURLPromises);
		return assignments.map((assignment, index) => {
			assignment.attachment.fileURL = fileURLs[index][0];
			return assignment;
		});
	} else {
		throw new Error('Unauthorized to access this course');
	}
};

module.exports.deleteAssignment = async ({ uid, courseId, classId, assignmentId }) => {
	const docRef = courseDb.doc(courseId).collection('classes').doc(classId);
	const doc = await docRef.get();
	console.log(chalk.yellow('Checking if teacher authorized to access course...'));
	if (doc.data().classCoordinator == uid) {
		console.log(chalk.green('Teacher authorized!'));
		console.log(chalk.yellow('Deleting assignment...'));
		const result = await docRef
			.collection('assignments')
			.doc(assignmentId)
			.update({ isDeleted: true });
		console.log(chalk.green('Deleted course!'));
		return;
	} else {
		throw new Error('Unauthorized to delete assignment from this course');
	}
};
