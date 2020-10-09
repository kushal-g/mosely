import React, { useParams } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { AuthProvider } from './context/Auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Courses from './pages/Courses/Courses';
import LinkDrive from './pages/LinkDrive/LinkDrive';
import DriveLoading from './pages/DriveLoading/DriveLoading';
import './App.css';
import GoogleSignIn from './pages/GoogleSignIn/GoogleSignIn';
import Test from './pages/Test/Test';
import CourseAssignment from './pages/CourseAssignment/CourseAssignment';
import AssignmentReport from './pages/AssignmentReport/AssignmentReport';
import AssignmentMatchCode from './pages/AssignmentReport/components/AssignmentMatchCode/AssignmentMatchCode';

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
					<PrivateRoute
						exact
						path="/course/assignment/:id"
						component={CourseAssignment}
					/>
					<PrivateRoute
						exact
						path="/course/assignment/report/:id"
						component={AssignmentReport}
					/>
					<PrivateRoute
						exact
						path="/course/assignments/matched"
						component={AssignmentMatchCode}
					/>
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
