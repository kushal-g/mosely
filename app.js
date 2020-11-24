require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const classRoomRouter = require('./routes/classRoomRouter');
const mossRouter = require('./routes/mossRouter');

const app = express();
const userDb = require('./models/userData');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/classroom', classRoomRouter);
app.use('/api/moss', mossRouter);

app.use(async (err, req, res, next) => {
	console.error(err, chalk.red(err.message));
	if (err.message === 'invalid_grant' || err.message === 'Invalid Credentials') {
		//access revoked
		console.log(chalk.yellow('Access is revoked, deleting...'));
		await userDb.removeUserData(req.user.uid);
		console.log(chalk.green('Deleted!'));
	}
	res.status(500).send({
		statusCode: 500,
		msg: err.message,
	});
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT, () => {
	console.log(chalk.magenta(`Server is running at port ${process.env.PORT}`));
});
