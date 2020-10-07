import React, { useContext, useEffect, useState } from 'react';
import './CourseAssignment.css';
import { AuthContext } from '../../context/Auth';
import CourseAssignmentCard from './components/CourseAssignmentCard';
import Navbar from '../../components/Navbar/Navbar';

export default function CourseAssignment(props) {
	const { currentUser, loading } = useContext(AuthContext);
	const [courseAssignment, setCourseAssignment] = useState([]);

	async function getAssignment() {
		const token = await currentUser.getIdToken();
		const result = await fetch(
			`${process.env.REACT_APP_URL}/classroom/courses/courseWork?courseId=${props.location.state.course.id}`,
			{
				method: 'get',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
			}
		);

		const body = await result.json();
		setCourseAssignment(body.data.courseWork);
		console.log(body.data.courseWork);
	}

	useEffect(() => {
		getAssignment();
	}, [currentUser]);

	return (
		<div>
			<Navbar />
			<div className="assignmentBox">
				<div className="courseDesc">
					<div className="assignmentCourseDetails">
						<div className="assignmentCourseName">
							{props.location.state.course.name}
						</div>
						<div className="assignmentCourseSection">
							{props.location.state.course.section
								? props.location.state.course.section
								: ' '}
						</div>
						<div className="courseTeacher">
							{props.location.state.course.teacherInfo.name.fullName}
						</div>
					</div>
				</div>
				<div className="assignmentCard">
					{courseAssignment.map(assign => {
						return <CourseAssignmentCard assignment={assign} />;
					})}
				</div>
			</div>
		</div>
	);
}
