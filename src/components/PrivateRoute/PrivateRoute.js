import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import WrapperComponent from './WrapperComponent';

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
	const { currentUser, loading } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={routeProps =>
				loading ? (
					<div></div>
				) : currentUser ? (
					<WrapperComponent user={currentUser}>
						<RouteComponent {...routeProps} user={currentUser} />
					</WrapperComponent>
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}
