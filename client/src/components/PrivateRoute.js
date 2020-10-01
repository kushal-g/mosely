import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
	const { currentUser, loading } = useContext(AuthContext);
	const [isLinked, setIsLinked] = useState(false);
	const [isLinkedLoading, setIsLinkedLoading] = useState(true);

	async function userLinked() {
		const token = await currentUser?.getIdToken();
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
	});

	return (
		<Route
			{...rest}
			render={routeProps =>
				loading ? (
					<div></div>
				) : currentUser ? (
					isLinkedLoading ? (
						<div></div>
					) : isLinked ? (
						<RouteComponent {...routeProps} user={currentUser} />
					) : (
						<Redirect to="/link" />
					)
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}
