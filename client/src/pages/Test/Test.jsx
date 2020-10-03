import React from 'react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/Auth';

export default function Test(props) {
	const { loading, currentUser } = useContext(AuthContext);
	useEffect(() => {
		if (!loading) {
			currentUser.getIdToken().then(token => console.log(token));
		}
	}, [loading, currentUser]);
	return <div></div>;
}
