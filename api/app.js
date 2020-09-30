require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');

const authRouter = require('./routes/authRouter');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);

app.use((err, req, res, next) => {
	console.error(err, chalk.red(err.message));
	res.status(500).send({
		statusCode: 500,
		msg: err.message,
	});
});

app.listen(process.env.PORT, () => {
	console.log(chalk.magenta(`Server is running at port ${process.env.PORT}`));
});

//getCourses();
//getCourseWork('175216215116');
//getSubmissions('175216215116', '175216215140');
//getFile('1Wi7hJM9nyZ064S9Hr3E_lzfq5CzcnwMG');
