import React from 'react';
import './GoogleSignIn.css';
import firebase from '../../utils/firebase';
//import * as firebase from 'firebase';

function GoogleSignIn() {
	const signed = () => {
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<div className="signInDiv">
			<button className="signInBtn" onClick={signed}>
				<div className="logo"></div>
				<label>Sign In with Google</label>
			</button>
		</div>
	);
}
export default GoogleSignIn;
