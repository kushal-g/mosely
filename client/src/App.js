import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Courses from './pages/Courses/Courses';
import LinkDrive from './pages/LinkDrive/LinkDrive';
import DriveLoading from './pages/DriveLoading/DriveLoading';
import './App.css';
import GoogleSignIn from './pages/GoogleSignIn/GoogleSignIn';
import Test from './pages/Test/Test';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="App">
					<Route exact path="/" component={GoogleSignIn} />
					<Route exact path="/link" component={LinkDrive} />
					<PrivateRoute exact path="/courses" component={Courses} />
					<Route exact path="/loading" component={DriveLoading} />
					<Route exact path="/test" component={Test} />
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
