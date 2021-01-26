module.exports = (submissionObj) => {
  if (submissionObj.assignmentSubmission.attachments) {
    return submissionObj.assignmentSubmission.attachments[0].driveFile.id;
  }
  return false;
};
