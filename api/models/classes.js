const admin = require('../utils/base')
const chalk =require('chalk')
const db =admin.firestore()

module.exports.createClass = (courseId, className, teacherUid) =>{
    return new Promise((resolve,reject)=>{
        db.collection(`/courses/${courseId}/classes`).add({
            className:className,
            dateCreated: new Date(),
            classCoordinator:teacherUid,
            isDeleted:false
        }).then(docRef=>{
            resolve(docRef.id)
        }).catch(e=>{
            reject(e.message)
        })
    })
}

module.exports.viewClassesOfCourse = (courseId) =>{
    return new Promise((resolve,reject)=>{
        let classes = []
        db.collection(`/courses/${courseId}/classes`)
        .get()
        .then(snapshot=>{
            snapshot.forEach(docRef=>classes.push(docRef.data()))
            Promise.all(classes).then(cls=>resolve(cls))
        })
        .catch(e=>reject(e.message))
    })
}