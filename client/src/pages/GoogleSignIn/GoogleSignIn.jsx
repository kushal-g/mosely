import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './GoogleSignIn.css';
import firebase from '../../utils/firebase';
//import * as firebase from 'firebase';

function GoogleSignIn() {
	//const [signedIn, setSignedIn] = useState(false);

	const signed = () => {
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				window.location.href = '/courses';
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div>
			<Navbar />
			<div className="signInDiv">
				<button className="signInBtn" onClick={signed}>
					<div className="logo"></div>
					<label>Sign In with Google</label>
				</button>
			</div>
		</div>
	);
}
export default GoogleSignIn;
