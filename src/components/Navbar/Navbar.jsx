import React, { useContext } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import {ChevronCircleDownIcon} from "react-line-awesome"
import firebase from '../../utils/firebase';
import { AuthContext } from '../../context/Auth';
import PopUp from "./PopUp";
import MessagePopUp from "./MessagePopUp";
import './Navbar.css';
import { useState } from 'react';

export default function Navbar() {
	const { currentUser, loading } = useContext(AuthContext);
	const [confirmMessage,setConfirmMessage]=useState("");
	const [viewMessage,setViewMessage]=useState(false);
	const [openDropdown,setOpenDropdown]=useState(false);
	const [viewMoss,setViewMoss]=useState(false);
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
					<div style={{position:"relative"}}>
					<button onClick={()=>setOpenDropdown((prev)=>{return !prev})} className="landingPage_menu__list">
						<ChevronCircleDownIcon/>
					</button>	
					{openDropdown &&
					<div className="arrowDropdown">
						<div onClick={()=>setViewMoss(true)}>View MOSS ID</div>
						<div onClick={logout}>Logout</div>
					</div>
				    }
					</div>				
				)}
			</nav>
			{
			 viewMoss && 
			  <PopUp setViewMoss={setViewMoss} setViewMessage={setViewMessage} setConfirmMessage={setConfirmMessage}/>
			}
			{
				viewMessage && 
				<MessagePopUp setViewMessage={setViewMessage} message={confirmMessage} />
			}
			{!loading && currentUser && <Sidebar currentUser={currentUser} open={openSidebar} />}
		</div>
	);
}
