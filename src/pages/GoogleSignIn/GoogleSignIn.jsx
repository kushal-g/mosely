import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './GoogleSignIn.css';
import firebase from '../../utils/firebase';
import { AuthContext } from '../../context/Auth';
import { useContext } from 'react';
import { useEffect } from 'react';
import GRAPH from "../../assets/graph.png"
import COMPARISON from "../../assets/comparison.png"

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
			<div className='landing'>
				<section className='section-one'>
					<div>
						<div className='section-title'>
							Focus on the assignment<br/>
							Leave plagiarism checks to us
						
						</div>
						<div className='section-subtitle'>
						Experience Fast and Effective Code Plagiarism check with mosely

						</div>
						<button className="signInBtn" onClick={signed}>
					<div className="logo"></div>
					<label>Sign In with Google</label>
				</button>
							</div>
					<div><img src={GRAPH} alt="graph"/></div>
				</section>
				
			</div>
			
				
			
		</div>
	);
}
export default GoogleSignIn;
