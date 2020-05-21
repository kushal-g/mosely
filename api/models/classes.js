const admin = require('../utils/base')
const chalk =require('chalk')
const db =admin.firestore()

module.exports.createClass = (teacher,name) =>{
    console.log(chalk.yellow('Creating a class...'))
    return db.collection('/classes').add({
        name:name,
        assignedTeachers:[
            teacher.uid
        ],
        assignedStudents:[],
        dateCreated: new Date(),
        isDeleted:false
    })
    .then(()=>{
        console.log(chalk.green('Class created'))
    })
}

module.exports.viewClasses = (teacherId) =>{       
    return new Promise((resolve,reject)=>{
        console.log(chalk.yellow('Getting classes...'))
        const classes = []
        let teachersPromise = []
        db.collection('/classes').where('assignedTeachers','array-contains',teacherId).where('isDeleted','==',false)
        .get()
        .then(snapshot=>{
            snapshot.forEach((doc,index) => {
                teachersPromise.push(getTeachers(doc.data().assignedTeachers))
                classes.push({
                    ...doc.data(),
                    id:doc.id
                })
            });
            Promise.all(teachersPromise).then(teachers=>{
                for(let i=0;i<classes.length;i++){
                    classes[i] = {...classes[i],assignedTeachers:teachers[i]}
                }
                resolve(classes)
            })
        })
    })
    
}

module.exports.renameClass = (classId,teacherUid,className) =>{
    return new Promise((resolve,reject)=>{
        let docRef = db.collection('/classes').doc(classId)
        docRef.get().then(doc=>{
            if(doc.data().assignedTeachers.indexOf(teacherUid)!=-1){
                docRef.update({
                    name:className
                }).then(()=>resolve())
            }else{
                reject('Not authorized to access this class')
            }
        })
    })  
}

module.exports.deleteClass = (teacherUid, classId) =>{
    return new Promise((resolve,reject)=>{
        let docRef = db.collection('/classes').doc(classId)
        docRef.get().then(doc=>{
            if(doc.data().assignedTeachers.indexOf(teacherUid)!=-1){
                docRef.update({
                    isDeleted:true
                }).then(()=>resolve())
            }else{
                reject('Not authorized to access this class')
            }
        })
    })  
}

function getTeachers(teacherIDs){
    return new Promise((resolve,reject)=>{
        const teachers = []
        teacherIDs.forEach((teacherId,index)=>{
            let docRef =db.collection('/teachers').doc(teacherId)
            .get().then(docSnap=>{
                teachers.push({
                    name:docSnap.data().name,
                    uid:teacherId
                })
                if(index===teacherIDs.length-1){
                    resolve(teachers)
                }
            })
        })              
    })
}