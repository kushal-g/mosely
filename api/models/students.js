const admin = require('../utils/base');
const chalk = require('chalk');
const db = admin.firestore();

const courseDb = db.collection('courses');
const studentDb = db.collection('students');
const teacherDb = db.collection('teachers');

module.exports.createStudentEntry = (uid, name, usn) => {
	let userRef = db.collection('students').doc(uid);
	console.log(chalk.yellow('Saving user details...'));
	return userRef
		.set({
			name: name,
			usn: usn,
			dateCreated: new Date(),
		})
		.then(() => {
			console.log(chalk.yellow('User details saved'));
		});
};

module.exports.addToClass = async ({ uid, classId }) => {
	const coursesQuery = await courseDb.get();
	let isClassFound = false;
	let requestedClassDetails = {
		courseDetails: null,
		classDetails: null,
	};

	console.log(chalk.yellow('Finding requested course and class details'));

	/*FINDING REQUESTED CLASS AND COURSE DETAILS*/
	for (let i = 0; i < coursesQuery.docs.length; i++) {
		if (isClassFound) {
			break;
		}
		const course = coursesQuery.docs[i];
		const classesQuery = await courseDb.doc(course.id).collection('classes').get();
		for (let j = 0; j < classesQuery.docs.length; j++) {
			if (classesQuery.docs[j].id === classId) {
				isClassFound = true;
				if (
					coursesQuery.docs[i].data().isDeleted ||
					classesQuery.docs[j].data().isDeleted
				) {
					throw new Error('Class not found');
				}
				requestedClassDetails = {
					courseDetails: {
						...coursesQuery.docs[i].data(),
						id: coursesQuery.docs[i].id,
					},
					classDetails: {
						...classesQuery.docs[j].data(),
						id: classesQuery.docs[j].id,
					},
				};
				break;
			}
		}
	}

	if (!isClassFound) {
		throw new Error('Class not found');
	}
	console.log(chalk.green('Found them!'));
	console.log(requestedClassDetails);

	/*CHECK IF STUDENT ALREADY REGISTERED TO COURSE*/
	console.log(chalk.yellow('Checking if student already registered to course'));
	const studentSelectedCourseDoc = await studentDb
		.doc(uid)
		.collection('courses')
		.doc(requestedClassDetails.courseDetails.id)
		.get();

	/* IF REGISTERED THROW ERROR*/
	if (studentSelectedCourseDoc.data()) {
		throw new Error('Student is already registered to this course');
	}

	console.log(chalk.yellow('Registering student to course and class...'));

	/* IF NOT REGISTERED, REGISTER TO CLASS */
	await studentDb
		.doc(uid)
		.collection('courses')
		.doc(requestedClassDetails.courseDetails.id)
		.create({
			classId: requestedClassDetails.classDetails.id,
		});
	console.log(chalk.green('Registered!'));
};

module.exports.viewClasses = async uid => {
	const coursesQuery = await studentDb.doc(uid).collection('courses').get();
	const classes = [];
	for (let i = 0; i < coursesQuery.docs.length; i++) {
		const course = coursesQuery.docs[i];

		const courseDoc = await courseDb.doc(course.id).get();
		const classDoc = await courseDb
			.doc(course.id)
			.collection('classes')
			.doc(course.data().classId)
			.get();

		const courseCoordinatorDoc = await teacherDb.doc(courseDoc.data().courseCoordinator).get();
		const classCoordinatorDoc = await teacherDb.doc(classDoc.data().classCoordinator).get();

		if (!(courseDoc.data().isDeleted || classDoc.data().isDeleted)) {
			classes.push({
				courseDetails: {
					id: courseDoc.id,
					...courseDoc.data(),
					courseCoordinator: {
						id: courseCoordinatorDoc.id,
						...courseCoordinatorDoc.data(),
					},
				},
				classDetails: {
					id: classDoc.id,
					...classDoc.data(),
					classCoordinator: { id: classCoordinatorDoc.id, ...classCoordinatorDoc.data() },
				},
			});
		}
	}

	return classes;
};
