require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const classRoomRouter = require('./routes/classRoomRouter');
const mossRouter = require('./routes/mossRouter');
const { getLanguage } = require('./utils/languageValidators');
const { createName, decodeNameAndEmail } = require('./utils/fileNameUtilsForMoss');
const parseURL = require('./utils/parseURL');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/classroom', classRoomRouter);
app.use('/moss', mossRouter);

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
