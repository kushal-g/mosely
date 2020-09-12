import React, { useEffect, useState } from 'react';
import TeacherPanel from '../TeacherPanel/TeacherPanel';
import TeacherClassCard from './TeacherClassCard';
import TeacherCreateClass from './TeacherCreateClass';
import TeacherCourseAssignment from '../TeacherAssignment/TeacherCourseAssignment';
import TeacherCourseAssignmentCard from '../TeacherAssignment/TeacherCourseAssignmentCard';
import './TeacherClassPage.css';
import  useDebounce from './use-debounce';
import { SearchIcon, PlusIcon } from 'react-line-awesome';
function TeacherClassPage(props) {
	const [showCourseAssignment, setShowCourseAssignment] = useState(false);
	const [courseAssignment, setCourseAssignment] = useState([]);
	const [showCreateClasses, setShowCreateClasses] = useState(false);
	const [classes, setClasses] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		if (debouncedSearchTerm) {
			setIsSearching(true);
			//api call
			searchTeachers().then(results => {
				console.log(results);
				setSearchResults(results);
				setIsSearching(false);
			});
		} else {
			setSearchResults([]);
		}
	}, [debouncedSearchTerm]);

	const searchTeachers = async () => {
		console.log(debouncedSearchTerm);
		const token = await props.user.getIdToken();
		const response = await fetch(`${process.env.REACT_APP_URL}/teacher/search`, {
			method: 'post',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				searchTerm: debouncedSearchTerm,
			}),
		});
		const body = await response.json();
		console.log(body);
		return body.data.teachers;
	};

	function ViewCourseAssignment(courseId) {
		setCourseAssignment([]);
		props.user.getIdToken().then(token => {
			console.log(token);
			fetch(`${process.env.REACT_APP_URL}/teacher/course/assignment/read`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					courseId: courseId,
				}),
			})
				.then(response => response.json())
				.then(body => {
					console.log(body);
					setCourseAssignment(body.data.courseAssignments);
				});
		});
	}
	useEffect(() => {
		ViewCourseAssignment(props.location.state.uniqueCourseId);
	}, []);

	function ViewClass(courseId) {
		setClasses([]);
		props.user.getIdToken().then(token => {
			console.log(token);
			fetch(`${process.env.REACT_APP_URL}/teacher/course/class/read`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					courseId: courseId,
				}),
			})
				.then(response => response.json())
				.then(body => {
					console.log(body);
					setClasses(body.data.classes);
				});
		});
	}

	useEffect(() => {
		ViewClass(props.location.state.uniqueCourseId);
	}, []);

	return (
		<div className="ClassPage">
			<TeacherPanel user={props.user} />
			<div className="courseAssignment">
				<div className="addCourseTeacher">
					<h2>
						<p>Add a Course Teacher</p>
					</h2>
					<input
						type="text"
						name="search"
						placeholder="Search.."
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="classButton">
					<h2>
						<p>ASSIGNMENTS</p>
					</h2>
					<button
						className="teacherCard_createClass"
						onClick={() => setShowCourseAssignment(true)}
					>
						<PlusIcon /> Create Course Assignment
					</button>
				</div>
				<div className="assignments">
					{showCourseAssignment && (
						<TeacherCourseAssignment
							offModal={() => setShowCourseAssignment(false)}
							user={props.user}
							ViewCourseAssignment={ViewCourseAssignment}
							uniqueCourseId={props.location.state.uniqueCourseId}
						/>
					)}
					{courseAssignment.map(assignObj => (
						<TeacherCourseAssignmentCard
							user={props.user}
							assignmentDescription={assignObj.description}
							ViewCourseAssignment={ViewCourseAssignment}
							uniqueCourseId={props.location.state.uniqueCourseId}
							assignmentId={assignObj.assignmentId}
							assignmentLanguage={assignObj.language}
							assignmentName={assignObj.name}
							dueDate={assignObj.dueDate.seconds}
						/>
					))}
				</div>
			</div>
			<div className="Classes">
				<div className="classButton">
					<h2>
						<p>CLASSES</p>
					</h2>
					<button
						onClick={() => setShowCreateClasses(true)}
						className="teacherCard_createClass"
					>
						<PlusIcon /> Create Class
					</button>
				</div>
				<div className="ViewClasses">
					{showCreateClasses && (
						<TeacherCreateClass
							ViewClass={ViewClass}
							offModal={() => setShowCreateClasses(false)}
							user={props.user}
							uniqueCourseId={props.location.state.uniqueCourseId}
						/>
					)}
					{classes.map(classObj => (
						<TeacherClassCard
							offModal={() => setShowCreateClasses(false)}
							uniqueCourseId={props.location.state.uniqueCourseId}
							user={props.user}
							ViewClass={ViewClass}
							letter={classObj.className}
							classId={classObj.classId}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default TeacherClassPage;
