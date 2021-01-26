module.exports = submissions => {
	let lastUpdateTime = 0;
	submissions.forEach(submission => {
		const lastSubmissionUpdate = new Date(submission.updateTime).getTime();
		if (lastSubmissionUpdate > lastUpdateTime) lastUpdateTime = lastSubmissionUpdate;
	});

	return lastUpdateTime;
};
