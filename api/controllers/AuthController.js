const admin = require('firebase-admin');
const chalk = require('chalk')
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://moss-web-55761.firebaseio.com'
});


module.exports.CheckAuthentication = (req,res,next)=>{
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

module.exports.createTeacher = (req,res,next)=>{
    console.log(chalk.green('Setting account to teacher'))
    admin.auth().getUserByEmail(req.user.email)
    .then(user=>admin.auth().setCustomUserClaims(user.uid,{
        role:{
            teacher:true,
            student:false
        }
    }))
    .then(()=>{
        console.log(chalk.yellow('Account set to teacher'))
        res.status(200).send({
            message:"Successfully created Teacher Account"
        })
    })
    .catch(e=>{
        console.log(chalk.red(e))
        res.status(500).send({message:"Internal Server Error"})
    })
}

module.exports.checkRole = (req,res,next) =>{
    admin.auth().getUserByEmail(req.body.email)
    .then(user=>{
        res.status(200).send({
            "statusCode":200,
            "data":{
                "role":user.customClaims.role
            }
        })
    })
    .catch(e=>{
        res.status(500).send({
            "statusCode":500,
            "data":{
                "msg": e.message
            }
        })
    })
}