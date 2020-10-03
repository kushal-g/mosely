import React, { useContext } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import firebase from '../../utils/firebase';
import { AuthContext } from '../../context/Auth';
import './Navbar.css';
import { useState } from 'react';

export default function Navbar() {
	const { currentUser, loading } = useContext(AuthContext);
	const [openSidebar, setOpenSidebar] = useState(false);
	const hamburgerClass = 'hamburger hamburger-spin';

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
				{!loading && currentUser && (
					<button
						onClick={() => {
							setOpenSidebar(prev => !prev);
						}}
						className="hamBtn"
					>
						<div
							class={`${hamburgerClass} ${openSidebar ? 'is-active' : ''}`}
							id="menu"
						>
							<div class="hamburger-box">
								<div class="hamburger-inner"></div>
							</div>
						</div>
					</button>
				)}
				<h1 className="landingPage_menu__logo">mosely</h1>
				{!loading && currentUser && (
					<button onClick={logout} className="landingPage_menu__list">
						Logout
					</button>
				)}
			</nav>
			<Sidebar open={openSidebar} />
		</div>
	);
}
