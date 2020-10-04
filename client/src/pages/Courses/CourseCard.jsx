import React from 'react';
import './CourseCard.css';

export default function CourseCard(props) {
	var randomColor = require('randomcolor');
	var color = randomColor();

	return (
		<div className="card">
			<div
				style={{
					backgroundColor: randomColor({
						luminosity: 'dark',
						format: 'rgba',
						alpha: 0.75,
					}),
				}}
				className="top"
			>
				<div className="courseName">{props.details.name}</div>
				<div className="courseSection">
					{props.details.section ? props.details.section : ' '}
				</div>
				<div className="courseTeacher">Teacher's Name</div>
			</div>
			<div className="bottom"></div>
		</div>
	);
}
