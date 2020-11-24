const descriptionRegex = /\/\/Language:(.+)\/\//;

const supportedLanguages = [
	'c',
	'cc',
	'java',
	'ml',
	'pascal',
	'ada',
	'lisp',
	'scheme',
	'haskell',
	'fortran',
	'ascii',
	'vhdl',
	'perl',
	'matlab',
	'python',
	'mips',
	'prolog',
	'spice',
	'vb',
	'csharp',
	'modula2',
	'a8086',
	'javascript',
	'plsql',
	'verilog',
];

module.exports.getLanguage = description => {
	const result = descriptionRegex.exec(description);
	if (result == null) return false;
	const languageProvided = result[1].trim();
	if (supportedLanguages.findIndex(l => l === languageProvided) === -1) return false;
	return languageProvided;
};
