import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/Auth';

function LinkDrive() {
	const { currentUser, loading } = useContext(AuthContext);
	useEffect(() => {
		console.log(loading);
		console.log(currentUser);
		if (!loading && !currentUser) window.location.href = '/';
	}, [loading, currentUser]);
	return (
		<div>
			<button>Link your drive and classroom</button>
		</div>
	);
}

export default LinkDrive;
