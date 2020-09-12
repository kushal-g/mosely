import React from 'react';
import './AddTeacher.css';

function AddTeacher(props) {
	function confirmAddTeacher() {
		props.user.getIdToken().then(token => {
			fetch(`${process.env.REACT_APP_URL}/teacher/course/teachers/add`, {
				method: 'post',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-type': 'application/json',
				},
				body: JSON.stringify({
					courseId: props.uniqueCourseId,
					teacherId: props.teacherId,
				}),
			})
				.then(response => response.json())
				.then(body => {
					console.log(body);
					props.offModal();
				});
		});
	}
	return (
		<div className="AddTeacherForm">
			<div className="AddTeacherForm_background" onClick={props.offModal}></div>
			<div className="AddTeacherForm_content">
				<h2>
					Are you sure you want to add{' '}
					<span style={{ fontWeight: '600' }}>{props.teacherName}</span> to this course?
				</h2>
				<button className="confirmYes" onClick={confirmAddTeacher}>
					YES
				</button>
				<button className="confirmNo" onClick={props.offModal}>
					NO
				</button>
			</div>
		</div>
	);
}

export default AddTeacher;
