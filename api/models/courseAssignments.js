const admin = require('../utils/base')
const chalk =require('chalk')
const db =admin.firestore()
const bucket = admin.storage().bucket()
//console.log(bucket)
const courseDb = db.collection('courses')
module.exports.createAssignment = async ({uid,courseId , name, dueDate, description , language, attachment}) =>{

    const docRef = courseDb.doc(courseId)
    const doc = await docRef.get()
    
    console.log(chalk.yellow('Checking if teacher is course coordinator...'))
    
    if(doc.data().courseCoordinator == uid){
        console.log(chalk.green('Teacher is couse coordinator!'))
        
        const fileName = `${courseId}/${Date.now()}-${attachment.originalname}`
        
        console.log("Generated file name: ",fileName)
        console.log(chalk.yellow('Saving file to bucket...'))
        
        await bucket.file(fileName).save(attachment.buffer)
        
        console.log(chalk.green('File saved to bucket'))
        const {buffer,...rest} = attachment
        console.log(chalk.yellow('Saving to firebase...'))
        
        const assignmentRef = await docRef.collection('assignments').add({name, description , language, dueDate: new Date(Number(dueDate)),attachment:{ ...rest, gcs_fileName:fileName}, isExpired:false, isDeleted:false })
        
        console.log(chalk.green('Saved to firebase'))
        return assignmentRef.id
    }else{
        throw new Error('Unauthorized to add assignment to this course')
    }
}

module.exports.deleteAssignment =async ({uid, courseId, assignmentId}) =>{
    const docRef = courseDb.doc(courseId)
    const doc = await docRef.get()
    console.log(chalk.yellow('Checking if teacher authorized to access course...'))
    if(doc.data().courseCoordinator == uid){
        console.log(chalk.green('Teacher authorized!'))
        console.log(chalk.yellow('Deleting assignment...'))
        const result = await docRef.collection('assignments').doc(assignmentId).update({isDeleted:true})
        console.log(chalk.green('Deleted course!'))
        return 
    }else{
        throw new Error('Unauthorized to delete assignment from this course')
    }
}