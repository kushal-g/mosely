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
const getLatestSubmissionDate = require('../utils/getLatestSubmissionDate');
const verifyMossId = require('../utils/verifyMossId');

module.exports.getMossId = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Checking if Moss ID present'));
		const mossId = await userDb.getMossId(req.user.uid);
		console.log(chalk.green(`Moss ID ${mossId ? 'Present' : 'Not Present'}`));
		res.status(200).send({
			statusCode: 200,
			data: {
				mossId,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports.saveMossId = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Verifying moss id...'));
		const isValid = await verifyMossId(req.body.mossId);
		if (isValid) {
			console.log(chalk.yellow('Saving moss id...'));
			await userDb.saveMossId(req.user.uid, req.body.mossId);
			console.log(chalk.green('Saved!'));
		} else {
			throw new Error('Invalid Moss ID');
		}
		next();
	} catch (e) {
		next(e);
	}
};

module.exports.getReport = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Getting report...'));
		const report = await reports.get(req.query.courseWorkId);
		console.log(chalk.green('Got it!'));
		res.status(200).send({
			statusCode: 200,
			data: {
				report: report ? report : false,
			},
		});
	} catch (e) {
		next(e);
	}
};

module.exports.initialSync = async (req, res, next) => {
	try {
		res.status(200).send({
			statusCode: 200,
			msg: 'Moss id saved',
		});
		console.log(chalk.yellow('Syncing reports...'));
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
				if (submissions.length < 2) {
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

				console.log(chalk.yellow(`Sending ${work.id} for evaluation...`));
				//Actually sends the files to moss
				const url = await client.process();
				//process url
				const report = parseURL(url);
				await reports.save({
					courseWorkId: work.id,
					report,
					lastUpdateTime: getLatestSubmissionDate(submissions),
					numSubmissions: submissions.length,
				});
				console.log(chalk.green(`Sync for ${work.id} complete`));
			}
		}

		console.log(chalk.green('Syncing complete'));
	} catch (e) {
		next(e);
	}
};

module.exports.incrementalSync = async (req, res, next) => {
	try {
		console.log(chalk.yellow('Begins incremental sync...'));
		const users = await userDb.getUsersWithMoss();
		for (user of users) {
			const { tokens, mossId } = user;
			let courses = await classRoomDb.getCourses(tokens);
			courses = courses.filter(course => course.teacherFolder); // Only sync courses where user is teacher

			for (const course of courses) {
				let courseWorks = await classRoomDb.getCourseWork(tokens, course.id);
				courseWorks = courseWorks.filter(work => getLanguage(work.description)); //Only sync coursework where i can find the language

				for (const work of courseWorks) {
					console.log(`Checking ${work.id}...`);
					const language = getLanguage(work.description);
					const client = new MossClient(language, mossId);

					const submissions = await classRoomDb.getSubmissions(
						tokens,
						course.id,
						work.id
					);

					const prevReport = await reports.get(work.id);
					const currentLastUpdateTime = getLatestSubmissionDate(submissions);

					//if a previous report exists
					if (prevReport !== undefined) {
						//No updates conditions
						if (
							prevReport.lastUpdateTime === currentLastUpdateTime &&
							prevReport.numSubmissions === submissions.length
						) {
							console.log('No updates');
							continue;
						}

						//old report which now has only 1 submission
						if (submissions.length < 2) {
							console.log('Discarding report');
							await reports.delete(work.id);
							continue;
						}
					}

					if (submissions.length < 2) {
						continue;
					}

					console.log('Generating new report');
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
					await reports.save({
						courseWorkId: work.id,
						report,
						lastUpdateTime: currentLastUpdateTime,
						numSubmissions: submissions.length,
					});
				}
			}
		}
		console.log(chalk.green('Incremental sync complete!'));
		res.sendStatus(200);
	} catch (e) {
		next(e);
	}
};
