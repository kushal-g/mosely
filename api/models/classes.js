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
            snapshot.forEach(docRef=>!docRef.data().isDeleted?classes.push({...docRef.data(),classId:docRef.id}):null)
            Promise.all(classes).then(cls=>resolve(cls))
        })
        .catch(e=>reject(e.message))
    })
}

module.exports.deleteClass = (courseId, classId, teacherUid) =>{
    return new Promise((resolve,reject)=>{
        const classRef = db.collection(`/courses/${courseId}/classes`).doc(classId)
    
        classRef.get()
        .then(doc=>{
            if(doc.data().classCoordinator === teacherUid){
                if(!doc.data().isDeleted){
                    classRef.update({
                        isDeleted:true
                    })
                    .then(()=>resolve())
                    .catch(e=>reject(e.message))    
                }else{
                    reject(`Class doesn't exist`)
                }
                
            }else{
                reject('Not authorized to access this class')
            }
        })
        .catch(e=>reject(e.message))
    })
}

module.exports.editClass = (courseId, classId, className, teacherUid) =>{
    return new Promise((resolve,reject)=>{
        const classRef = db.collection(`/courses/${courseId}/classes`).doc(classId)
        classRef.get()
        .then(doc=>{
            if(doc.data().isDeleted){
                reject('Class not found')
            }else if(doc.data().classCoordinator !== teacherUid){
                reject('Not authorized to access this class')
            }else{
                classRef.update({
                    className:className
                })
                .then(()=>resolve())
                .catch(e=>reject(e.message))
            }
        })
        .catch(e=>reject(e.message))
    })    

}