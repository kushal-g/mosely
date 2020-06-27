const admin = require('firebase-admin')


admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://moss-web-55761.firebaseio.com',
    storageBucket:process.env.BUCKET_NAME
});

module.exports = admin