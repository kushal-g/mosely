const cheerio = require('cheerio');
const request = require('sync-request');
const { decodeNameAndEmail } = require('./fileNameUtilsForMoss');

module.exports = function (url) {
	try {
		let res = request('GET', url);
		let html = res.getBody('utf8');

		var pair = {};
		var pairs = [];

		const $ = cheerio.load(html);
		$('body > table > tbody > tr > td').each((index, element) => {
			let str = $(element).text().trim();
			let code;
			let codeURL =
				$(element).children('a')[0] == undefined
					? undefined
					: $(element).children('a')[0].attribs.href;

			if (codeURL) {
				codeURL = codeURL.split('.html')[0] + `-${index % 3}.html`;
				res = request('GET', codeURL);
				let html_code = res.getBody('utf8');
				const ch = cheerio.load(html_code);
				code = ch('pre').text();
			}

			switch (index % 3) {
				case 0:
					pair.file1 = str.substr(0, str.indexOf('(') - 1);
					pair.file1 = decodeNameAndEmail(pair.file1);
					pair.file1.percentage = parseInt(/\(([^)]+)%\)/.exec(str)[1]);
					pair.file1.code = code;
					break;
				case 1:
					pair.file2 = str.substr(0, str.indexOf('(') - 1);
					pair.file2 = decodeNameAndEmail(pair.file2);
					pair.file2.percentage = parseInt(/\(([^)]+)%\)/.exec(str)[1]);
					pair.file2.code = code;
					break;
				case 2:
					pair.linesMatched = parseInt(str);
					pairs.push(pair);
					pair = {};
					break;
				default:
					break;
			}
		});
		return pairs;
	} catch (e) {
		console.log(e);
	}
};
