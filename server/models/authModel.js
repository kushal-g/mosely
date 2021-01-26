const { google } = require('googleapis');

const SCOPES = [
	'https://www.googleapis.com/auth/classroom.courses',
	'https://www.googleapis.com/auth/classroom.coursework.students',
	'https://www.googleapis.com/auth/classroom.profile.emails',
	'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
	'https://www.googleapis.com/auth/drive',
	'https://www.googleapis.com/auth/classroom.rosters.readonly',
	'https://www.googleapis.com/auth/classroom.profile.photos',
];

module.exports.getAuthLink = () => {
	const oauthClient = getOAuthClient();

	const oauthURL = oauthClient.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});

	return oauthURL;
};

module.exports.confirmAuthorization = async authCode => {
	const oauthClient = getOAuthClient();
	const token = await oauthClient.getToken(authCode);
	return token;
};

module.exports.revokeTokens = async tokens => {
	const oauthClient = getOAuthClient();
	console.log(tokens);
	const result = await oauthClient.revokeToken(tokens.refresh_token);
	return result.data.success;
};

const getOAuthClient = () => {
	const credentials = JSON.parse(process.env.CLASSROOM_CREDENTIALS);
	const { client_secret, client_id, redirect_uris } = credentials.web;
	return (oauthClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]));
};
