import React, { useContext } from 'react';
import firebase from '../../utils/firebase';
import { AuthContext } from '../../context/Auth';
import './Navbar.css';

export default function Navbar() {
	const { currentUser, loading } = useContext(AuthContext);

	function logout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				window.location.href = '/';
			});
	}

	return (
		<div className="landingPage_container landingPage_center">
			<nav className="landingPage_menu">
				<h1 className="landingPage_menu__logo">mosely</h1>
				{!loading && currentUser && (
					<button onClick={logout} className="landingPage_menu__list">
						Logout
					</button>
				)}
			</nav>
		</div>
	);
}
