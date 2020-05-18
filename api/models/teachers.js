const admin = require('../utils/base')
const chalk =require('chalk')
const db =admin.firestore()

module.exports.createTeacherEntry = (uid,name,mossId) =>{
    let userRef = db.collection('teachers').doc(uid)
    console.log(chalk.yellow('Saving user details...'))
    return userRef.set({
        "name":name,
        "mossId":mossId
    }).then(()=>{
        console.log(chalk.yellow('User details saved'))
    })
}