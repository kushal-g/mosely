import React, { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../context/Auth';
import Loader from '../../components/Loader/Loader';

export default function DriveLoading() {
	const { currentUser, loading } = useContext(AuthContext);
	const params = new URLSearchParams(window.location.search);
	const authCode = params.get('code');
	console.log(authCode);

	async function linkClassDrive() {
		const token = await currentUser.getIdToken();
		const result = await fetch(`${process.env.REACT_APP_URL}/auth/authorize`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				authCode: authCode,
			}),
		});

		const body = await result.json();
		window.location.href = '/courses';
		console.log(body);
	}

	useEffect(() => {
		if (currentUser && !loading) linkClassDrive();
	}, [currentUser, loading]);

	return <Loader />;
}
