import React from 'react';
import { TrashIcon, EditIcon } from 'react-line-awesome';
import './TeacherAssignmentCard.css';
function TeacherClassAssignmentCard(props) {
	var randomColor = require('randomcolor');

	function DeleteClassAssignment() {
		props.user.getIdToken().then(token => {
			console.log(props.uniqueCourseId);
			console.log(props.assignmentId);
			fetch(`${process.env.REACT_APP_URL}/teacher/course/class/assignment/delete`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
                    courseId: props.uniqueCourseId,
                    classId:props.classId,
					assignmentId: props.assignmentId,
				}),
			})
				.then(response => response.json())
				.then(body => {
					console.log(body);
					props.ViewClassAssignment();
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
			<TrashIcon onClick={DeleteClassAssignment} />
		</div>
	);
}

export default TeacherClassAssignmentCard;