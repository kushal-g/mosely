const { google } = require('googleapis');
const fs = require('fs');

const getDrive = () => {
	const content = fs.readFileSync('credentials.json');
	const credentials = JSON.parse(content);
	const { client_secret, client_id, redirect_uris } = credentials.web;
	const oauthClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
	const { tokens } = JSON.parse(fs.readFileSync('token.json'));
	oauthClient.setCredentials(tokens);
	return google.drive({ version: 'v2', auth: oauthClient });
};

module.exports.getFile = async fileId => {
	const drive = getDrive();
	const { data } = await drive.files.get({ fileId, alt: 'media' });
	console.log(data);
};
