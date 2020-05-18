const admin = require('../utils/base')
const chalk =require('chalk')
const db =admin.firestore()

module.exports.createClass = (teacherUid,name) =>{
    console.log(chalk.yellow('Creating a class...'))
    return db.collection('/classes').add({
        name:name,
        assignedTeachers:[teacherUid],
        assignedStudents:[]
    })
    .then(()=>{
        console.log(chalk.green('Class created'))
    })
}