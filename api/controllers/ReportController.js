const classRoomDb = require('../models/classroomModel');
const googleDrive = require('../models/driveModel');
const extractDriveId = require('../utils/extractDriveId');
const userDb = require('../models/userData');
const MossClient = require('../models/moss');
const { getLanguage } = require('../utils/languageValidators');
const chalk = require('chalk');
const { createName } = require('../utils/fileNameUtilsForMoss');
const parseURL = require('../utils/parseURL');
const reports = require('../models/report');

module.exports.saveMossId = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Saving moss id...'));
		await userDb.saveMossId(req.user.uid, req.body.mossId);
		console.log(chalk.green('Saved!'));
		next();
	} catch (e) {
		next(e);
	}
};

module.exports.initialSync = async (req, res, next) => {
	try {
		const { tokens } = req;
		let courses = await classRoomDb.getCourses(tokens);
		const mossId = await userDb.getMossId(req.user.uid);
		courses = courses.filter(course => course.teacherFolder); // Only sync courses where user is teacher

		for (const course of courses) {
			let courseWorks = await classRoomDb.getCourseWork(tokens, course.id);
			courseWorks = courseWorks.filter(work => getLanguage(work.description)); //Only sync coursework where i can find the language
			for (const work of courseWorks) {
				const language = getLanguage(work.description);
				const client = new MossClient(language, mossId);
				const submissions = await classRoomDb.getSubmissions(tokens, course.id, work.id);

				//Since need at least 2 files for comparison
				if (submissions < 2) {
					continue;
				}

				for (const singleSubmission of submissions) {
					const driveId = extractDriveId(singleSubmission);
					const submittedCode = await googleDrive.getFile(tokens, driveId);

					const {
						name: { fullName },
						emailAddress,
					} = await classRoomDb.getUserDetails(tokens, singleSubmission.userId);

					client.addRawFile(submittedCode, createName(fullName, emailAddress));
				}

				//Actually sends the files to moss
				const url = await client.process();
				//process url
				const report = parseURL(url);
				await reports.save(work.id, report);
			}
		}

		res.status(200).send({
			statusCode: 200,
			msg: 'Moss id saved and initial sync complete',
		});
	} catch (e) {
		next(e);
	}
};
