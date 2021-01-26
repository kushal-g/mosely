const { google } = require("googleapis");

const getDrive = (tokens) => {
  const credentials = JSON.parse(process.env.CLASSROOM_CREDENTIALS);
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oauthClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oauthClient.setCredentials(tokens);
  return google.drive({ version: "v2", auth: oauthClient });
};

module.exports.getFile = async (tokens, fileId) => {
  const drive = getDrive(tokens);
  const { data } = await drive.files.get({ fileId, alt: "media" });
  return data;
};

module.exports.getFilename = async (tokens, fileId) => {
  const drive = getDrive(tokens);
  const { data } = await drive.files.get({ fileId });
  return data.title;
};
