require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');

const teacherRouter = require('./routes/teacherRoutes');
const studentRouter = require('./routes/studentRoutes');
const adminRouter = require('./routes/adminRoutes');
const { addToClass, viewClasses } = require('./models/students');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use(adminRouter);

app.listen(process.env.PORT, () => {
	console.log(chalk.magenta(`Server is running at port ${process.env.PORT}`));
});
