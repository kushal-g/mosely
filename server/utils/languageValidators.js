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

const extension_map = {
	'c':'c',
	'cc':'cpp',
	'java':'java',
	'ml':'ml',
	'pascal':'ps',
	'ada':'ada',
	'lisp':'lsp',
	'scheme':'scm',
	'haskell':'hs',
	'fortran':'for',
	'ascii':'txt',
	'vhdl':'vhd',
	'perl':'pl',
	'matlab':'mat',
	'python':'py',
	'mips':'s',
	'prolog':'pl',
	'spice':'sp',
	'vb':'vb',
	'csharp':'cs',
	'modula2':'mod',
	'a8086':'asm', //Needs verification???
	'javascript':'js',
	'plsql':'sql',
	'verilog':'v',
}

module.exports.getLanguage = description => {
	const result = descriptionRegex.exec(description);
	if (result == null) return false;
	const languageProvided = result[1].trim();
	if (supportedLanguages.findIndex(l => l === languageProvided) === -1) return false;
	return languageProvided;
};

module.exports.verifyFileExtension = (fileName,language) =>{
	const fileNameArray = fileName.split(".")
	return extension_map[language]===fileNameArray[fileNameArray.length - 1]
}
