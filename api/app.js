require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const teacherRouter = require('./routes/teacherRoutes')
const studentRouter = require('./routes/studentRoutes')
const adminRouter = require('./routes/adminRoutes')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(teacherRouter)
app.use(studentRouter)
app.use(adminRouter)

app.listen(process.env.PORT,()=>{
    console.log(chalk.yellow(`Server is running at port ${process.env.PORT}`))
})