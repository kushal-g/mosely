const admin = require('../utils/base');
const chalk = require('chalk')
const teachersDb = require('../models/teachers')
const coursesDb = require('../models/courses')
const classesDb = require('../models/classes')

const languagesAllowed = require('../models/languagesAllowed')

module.exports.createCourse = (req,res,next) =>{
    const {courseName, courseCode, courseDesc} = req.body
    coursesDb.createCourse(req.user,courseCode,courseName,courseDesc)
    .then(()=>{
        res.status(200).send({
            statusCode:200,
            data:{
                msg:"Successfully created a course"
            }
        })
    })
    .catch(e=>res.status(500).send({
        statusCode:500,
        data:{
            msg:e.message
        }
    }))
}

module.exports.viewCourse = (req,res,next) =>{
    try{
        coursesDb.viewCourse(req.user.uid)
        .then(courses=>{
            console.log
            courses.sort((a,b)=>a.dateCreated._seconds - b.dateCreated._seconds).reverse()
            console.log(courses)
            console.log(chalk.green('Got courses'))
            res.status(200).send({
                statusCode:200,
                data:{
                    courses:courses
                }
            })
        })
    }catch(e){
        console.log(chalk.red(e.message))
        res.status(500),send({
            statusCode:500,
            data:{
                msg:e.message
            }
        })
    }
}

module.exports.editCourse = (req,res,next) =>{
    console.log(chalk.yellow('Renaming course...'))

    const {courseId, courseName, courseCode, courseDesc} =req.body

    coursesDb.editCourse(courseId,req.user.uid,courseCode,courseName,courseDesc)
    .then(()=>{
        console.log(chalk.green('Successfully renamed course'))
        res.status(200).send({
            statusCode:200,
            data:{
                msg:"Successfully renamed course"
            }
        })
    })
    .catch(e=>{
        res.status(500).send({
            statusCode:500,
            data:{
                statusCode:500,
                data:{
                    msg:e.message
                }
            }
        })
    })
}

module.exports.deleteCourse = (req,res,next) =>{
    console.log(chalk.yellow('Deleting course...'))
    coursesDb.deleteCourse(req.user.uid,req.body.courseId)
    .then(()=>{
        console.log(chalk.green('Successfully deleted course'))
        res.status(200).send({
            statusCode:200,
            data:{
                msg:"Successfully deleted course"
            }
        })
    })
    .catch(e=>{
        res.status(500).send({
            statusCode:500,
            data:{
                statusCode:500,
                data:{
                    msg:e.message
                }
            }
        })
    })
}

module.exports.createClass = (req,res,next) =>{
  console.log(chalk.yellow('Creating class...')); 
  const {className, courseId} = req.body;
  classesDb.createClass(courseId, className, req.user.uid)
  .then(classId=>{
      console.log(chalk.green('Created class'));
      res.status(200).send({
          statusCode:200,
          data:{
            msg:'Successfully created class',             
            classId:classId
          }
      })
  })  
  .catch(e=>{
    console.log(chalk.red(e.message))
    res.status(500).send({
        statusCode:500,
        data:{
          msg:e.message
        }
    })
  })
}

module.exports.viewClassOfCourse = (req,res,next) =>{
    const {courseId} = req.body
    console.log(chalk.yellow('Getting classes...'))
    classesDb.viewClassesOfCourse(courseId)
    .then(classes=>{
        console.log(chalk.green('Got classes'))
        res.status(200).send({
            statusCode:200,
            data:{
                msg:"Successfully fetched classes",
                classes:classes
            }
        })
    })
    .catch(e=>{
        console.log(chalk.red(e.message))
        res.status(500).send({
            statusCode:500,
            data:{
                msg:e.message
            }
        })
    })    
}

module.exports.deleteClass = (req,res,next) =>{
    const {courseId, classId} = req.body
    console.log()
    classesDb.deleteClass(courseId,classId,req.user.uid)   
    .then(()=>{
        res.status(200).send({
            statusCode:200,
            data:{
                msg:'Successfully deleted the class'
            }
        })
    })
    .catch(e=>{
        res.status(500).send({
            statusCode:500,
            data:{
                msg:e || e.message
            }
        })
    })
}

module.exports.editClass = (req,res,next) =>{
    console.log(chalk.yellow('Editing class...'))
    const {courseId, classId, className} = req.body
    classesDb.editClass(courseId,classId,className,req.user.uid)
    .then(()=>{
        console.log(chalk.green('Edited class'))
        res.status(200).send({
            statusCode:200,
            data:{
                msg:'Successfully edited class'
            }
        })
    })
    .catch(e=>{
        res.status(500).send({
            statusCode:500,
            data:{
                msg: e.message || e
            }
        })
    })
}