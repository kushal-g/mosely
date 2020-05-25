const admin = require('../utils/base')
const chalk =require('chalk')
const db =admin.firestore()

module.exports.createStudentEntry = (uid,name,usn) =>{
    let userRef = db.collection('students').doc(uid)
    console.log(chalk.yellow('Saving user details...'))
    return userRef.set({
        "name":name,
        "usn":usn,
        "dateCreated":new Date()
    }).then(()=>{
        console.log(chalk.yellow('User details saved'))
    })
}