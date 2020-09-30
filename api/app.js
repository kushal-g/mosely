require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');

const router = require('./routes/router');
const { authorize } = require('./models/authModel');
const { getCourses, getCourseWork, getSubmissions } = require('./models/classroomModel');
const { getFile } = require('./models/driveModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(router);

app.listen(process.env.PORT, () => {
	console.log(chalk.magenta(`Server is running at port ${process.env.PORT}`));
});

//authorize();
//getCourses();
//getCourseWork('175216215116');
//getSubmissions('175216215116', '175216215140');
//getFile('1Wi7hJM9nyZ064S9Hr3E_lzfq5CzcnwMG');
