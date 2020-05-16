const express = require('express')
const Authcontroller = require('../controllers/AuthController')

const router = express.Router()

const {CheckAuthentication, createTeacher} = Authcontroller;

router.get('/',CheckAuthentication,(req,res)=>{
    res.status(200).send({
        msg:"Authorized",
        user:req.user
    })
})

router.post("/teacher/create",CheckAuthentication,createTeacher)

module.exports = router