const admin = require('../utils/base');
const chalk = require('chalk')
const teachersDb = require('../models/teachers')
const classesDb = require('../models/classes')


module.exports.createClass = (req,res,next) =>{
    classesDb.createClass(req.user.uid,req.body.name)
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