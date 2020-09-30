const { google } = require('googleapis');
const fs = require('fs');

const getClassroom = () => {
	const content = fs.readFileSync('credentials.json');
	const credentials = JSON.parse(content);
	const { client_secret, client_id, redirect_uris } = credentials.web;
	const oauthClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	const { tokens } = JSON.parse(fs.readFileSync('token.json'));
	oauthClient.setCredentials(tokens);
	return google.classroom({ version: 'v1', auth: oauthClient });
};

module.exports.getCourses = async () => {
	const classroom = getClassroom();
	const {
		data: { courses },
	} = await classroom.courses.list();
	console.log(courses);
};

module.exports.getCourseWork = async courseId => {
	const classroom = getClassroom();
	const {
		data: { courseWork },
	} = await classroom.courses.courseWork.list({ courseId });
	console.log(courseWork);
};

module.exports.getSubmissions = async (courseId, courseWorkId) => {
	const classroom = getClassroom();
	const {
		data: { studentSubmissions },
	} = await classroom.courses.courseWork.studentSubmissions.list({ courseId, courseWorkId });
	console.log(studentSubmissions);
	console.log(studentSubmissions[0].assignmentSubmission.attachments[0].driveFile);
};
