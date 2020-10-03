module.exports.createName = (fullName, emailAddress) => {
	const changedName = fullName.split(' ').join('_whitespace_');
	return `${changedName}_emailAddress_${emailAddress}`;
};

module.exports.decodeNameAndEmail = name => {
	const name_email = name.split('_emailAddress_');
	const email = name_email[1];
	const fullName = name_email[0].split('_whitespace_').join(' ');
	return {
		fullName,
		email,
	};
};
