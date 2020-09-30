const { google } = require('googleapis');

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