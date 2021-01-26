import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './GoogleSignIn.css';
import firebase from '../../utils/firebase';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { useEffect } from 'react';

function GoogleSignIn() {
	//const [signedIn, setSignedIn] = useState(false);
	const { loading, currentUser } = useContext(AuthContext);

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

	useEffect(() => {
		if (!loading && currentUser) {
			window.location.href = '/courses';
		}
	}, [loading, currentUser]);

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
