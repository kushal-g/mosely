const admin = require('firebase-admin');
const chalk = require('chalk')
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://moss-web-55761.firebaseio.com'
});


//TODO: Test it
module.exports.AuthController = (req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        let idToken = req.headers.authorization.split('Bearer ')[1]  
        admin.auth().verifyIdToken(idToken)
        .then(decodedToken=>{   
            req.user = decodedToken
            next()
        }).catch(e=>{
            console.log(chalk.red("Error in authorizing token"));
            res.status(403).json({
                error:'Unauthorized'
            })
        })
    }else{
        console.log(chalk.red("Token not present"));  
        res.status(403).json({
            error:'Unauthorized'
        })
    }
}