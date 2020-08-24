import React from 'react';
import { TrashIcon, EditIcon } from 'react-line-awesome';
import './TeacherAssignmentCard.css';
function TeacherAssignment(props) {
	var randomColor = require('randomcolor');

	function DeleteAssignment() {
		props.user.getIdToken().then(token => {
			console.log(props.uniqueCourseId);
			console.log(props.assignmentId);
			fetch(`${process.env.REACT_APP_URL}/teacher/course/assignment/delete`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					courseId: props.uniqueCourseId,
					assignmentId: props.assignmentId,
				}),
			})
				.then(response => response.json())
				.then(body => {
					console.log(body);
					props.ViewCourseAssignment(props.uniqueCourseId);
				});
		});
	}

	return (
		<div
			style={{ backgroundColor: randomColor({ luminosity: 'light' }) }}
			className="assignmentCard"
		>
			<div className="assignmentHead">
				{' '}
				<h2>{props.assignmentName}</h2>
			</div>
			<div className="assignmentSubHead">
				{props.assignmentDescription}
				<hr></hr>
				{props.dueDate}
				{props.assignmentLanguage}
			</div>
			<TrashIcon onClick={DeleteAssignment} />
		</div>
	);
}

export default TeacherAssignment;
