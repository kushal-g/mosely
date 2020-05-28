const admin = require('../utils/base');
const chalk = require('chalk')
const teachersDb = require('../models/teachers')
const coursesDb = require('../models/courses')
const languagesAllowed = require('../models/languagesAllowed')

module.exports.createCourse = (req,res,next) =>{
    coursesDb.createCourse(req.user,req.body.name)
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

module.exports.renameCourse = (req,res,next) =>{
    console.log(chalk.yellow('Renaming course...'))
    coursesDb.renameCourse(req.body.courseId,req.user.uid,req.body.className)
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
