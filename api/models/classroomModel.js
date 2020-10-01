const { google } = require('googleapis');
const { CourseWorkType } = require('../utils/enums');

const getClassroom = tokens => {
	const credentials = JSON.parse(process.env.CLASSROOM_CREDENTIALS);
	const { client_secret, client_id, redirect_uris } = credentials.web;
	const oauthClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	oauthClient.setCredentials(tokens);
	return google.classroom({ version: 'v1', auth: oauthClient });
};

module.exports.getClassroomUserId = async tokens => {
	const classRoom = getClassroom(tokens);
	const {
		data: { id },
	} = await classRoom.userProfiles.get({ userId: 'kushalgarg2000@gmail.com' });
	return id;
};

module.exports.getCourses = async tokens => {
	const classroom = getClassroom(tokens);
	const {
		data: { courses },
	} = await classroom.courses.list();
	return courses;
};

module.exports.getCourseWork = async (tokens, courseId) => {
	const classroom = getClassroom(tokens);
	const {
		data: { courseWork },
	} = await classroom.courses.courseWork.list({ courseId });
	return courseWork.filter(work => work.workType === CourseWorkType.ASSIGNMENT);
};

module.exports.getSubmissions = async (courseId, courseWorkId) => {
	const classroom = getClassroom();
	const {
		data: { studentSubmissions },
	} = await classroom.courses.courseWork.studentSubmissions.list({ courseId, courseWorkId });
	console.log(studentSubmissions);
	console.log(studentSubmissions[0].assignmentSubmission.attachments[0].driveFile);
};
