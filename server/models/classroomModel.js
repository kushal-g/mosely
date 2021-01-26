const { google } = require('googleapis');
const { CourseWorkType, SubmissionState } = require('../utils/enums');

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
	} = await classRoom.userProfiles.get({ userId: 'me' });
	return id;
};

module.exports.getUserDetails = async (tokens, userId) => {
	const classroom = getClassroom(tokens);
	const { data } = await classroom.userProfiles.get({ userId });
	return data;
};

module.exports.getCourses = async tokens => {
	const classroom = getClassroom(tokens);
	const {
		data: { courses },
	} = await classroom.courses.list();
	return courses === undefined ? [] : courses;
};

module.exports.getSingleCourse = async (tokens, courseId) => {
	const classroom = getClassroom(tokens);
	const { data } = await classroom.courses.get({ id: courseId });
	return data;
};

module.exports.getCourseWork = async (tokens, courseId) => {
	const classroom = getClassroom(tokens);
	const {
		data: { courseWork },
	} = await classroom.courses.courseWork.list({ courseId });
	return courseWork === undefined
		? []
		: courseWork.filter(work => work.workType === CourseWorkType.ASSIGNMENT);
};

module.exports.getSubmissions = async (tokens, courseId, courseWorkId) => {
	const classroom = getClassroom(tokens);
	const {
		data: { studentSubmissions },
	} = await classroom.courses.courseWork.studentSubmissions.list({ courseId, courseWorkId });
	return studentSubmissions === undefined
		? []
		: studentSubmissions.filter(submission => submission.state === SubmissionState.TURNED_IN);
};
