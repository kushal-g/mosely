import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function WrapperComponent(props) {
	const [isLinked, setIsLinked] = useState(false);
	const [isLinkedLoading, setIsLinkedLoading] = useState(true);

	async function userLinked() {
		const token = await props.user.getIdToken();
		const result = await fetch(`${process.env.REACT_APP_URL}/auth/isLinked`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
		});

		const body = await result.json();
		setIsLinked(body.data.isLinked);
		setIsLinkedLoading(false);
		console.log(body);
	}

	useEffect(() => {
		userLinked();
	}, []);

	return <>{isLinkedLoading ? null : isLinked ? props.children : <Redirect to="/link" />}</>;
}
