const express = require('express')
const Authcontroller = require('../controllers/AuthController')

const router = express.Router()

const {CheckAuthentication, createTeacher, checkRole} = Authcontroller;

router.post('/role',checkRole)

router.post("/teacher/create",CheckAuthentication,createTeacher)


module.exports = router