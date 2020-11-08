const MossClient = require('../models/moss');

module.exports = async mossId => {
	let client = new MossClient('python', mossId);

	async function start() {
		try {
			client.setComment('project1');
			console.log(__dirname);
			client.addFile(__dirname + '/submissions/sub1.py', 'sub1');
			client.addFile(__dirname + '/submissions/sub2.py', 'sub2');

			let url = await client.process();
			console.log('Verified moss id!');
			return true;
		} catch (e) {
			console.log('Invalid moss id!');
			return false;
		}
	}

	return await start();
};
