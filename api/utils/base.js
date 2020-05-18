const admin = require('firebase-admin')


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://moss-web-55761.firebaseio.com'
});

module.exports = admin