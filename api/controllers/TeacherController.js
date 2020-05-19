const admin = require('../utils/base');
const chalk = require('chalk')
const teachersDb = require('../models/teachers')
const classesDb = require('../models/classes')


module.exports.createClass = (req,res,next) =>{
    classesDb.createClass(req.user,req.body.name)
    .then(()=>{
        res.status(200).send({
            statusCode:200,
            data:{
                msg:"Successfully created a class"
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

module.exports.viewClasses = (req,res,next) =>{
    try{
        classesDb.viewClasses(req.user.uid)
        .then(classes=>{
            console.log(chalk.green('Got classes'))
            res.status(200).send({
                statusCode:200,
                data:{
                    classes:classes
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

module.exports.renameClass = (req,res,next) =>{
    console.log(chalk.yellow('Renaming class...'))
    classesDb.renameClass(req.body.classId,req.user.uid,req.body.className)
    .then(()=>{
        console.log(chalk.green('Successfully renamed class'))
        res.status(200).send({
            statusCode:200,
            data:{
                msg:"Successfully renamed class"
            }
        })
    })
    .catch(e=>{
        res.send(500).send({
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