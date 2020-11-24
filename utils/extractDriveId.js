module.exports = submissionObj => {
	return submissionObj.assignmentSubmission.attachments[0].driveFile.id;
};
