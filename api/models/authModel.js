const { google } = require('googleapis');
const fs = require('fs');

const SCOPES = [
	'https://www.googleapis.com/auth/classroom.courses',
	'https://www.googleapis.com/auth/classroom.coursework.students',
	'https://www.googleapis.com/auth/classroom.profile.emails',
	'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly',
	'https://www.googleapis.com/auth/drive',
];

module.exports.authorize = async () => {
	const oauthClient = getOAuthClient();

	const oauthURL = oauthClient.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES,
	});
	console.log(oauthURL);
};

module.exports.confirmAuthorization = async authCode => {
	console.log(authCode);
	const token = await oauthClient.getToken(authCode);
	console.log(token);
	fs.writeFile('token.json', JSON.stringify(token), err => {
		if (err) return console.error(err);
	});
};

const getOAuthClient = () => {
	const content = fs.readFileSync('credentials.json');

	const credentials = JSON.parse(content);

	console.log(credentials);
	const { client_secret, client_id, redirect_uris } = credentials.web;
	console.log(client_id, client_secret, redirect_uris);
	return (oauthClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]));
};
