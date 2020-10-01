import React from 'react';
import { useEffect } from 'react';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';

export default function Root(props) {
	const params = new URLSearchParams(window.location.search);
	const authCode = params.get('code');
	console.log(authCode);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_URL}/auth/authorize`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				authCode,
			}),
		})
			.then(response => response.json())
			.then(body => console.log(body));
	}, []);
	return (
		<div>
			<GoogleSignIn />
		</div>
	);
}
