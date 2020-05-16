const express = require('express')
const Authcontroller = require('../controllers/AuthController').AuthController

const router = express.Router()

router.get('/',Authcontroller,(req,res)=>{
    res.status(200).send({
        msg:"Authorized",
        user:req.user
    })
})

module.exports = router