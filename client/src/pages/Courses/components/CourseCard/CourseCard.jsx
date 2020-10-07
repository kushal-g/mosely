import React from 'react';
import randomColor from 'randomcolor';
import './CourseCard.css';

export default function CourseCard({ details }) {
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
				<div className="courseName">{details.name}</div>
				<div className="courseSection">{details.section ? details.section : ' '}</div>
				<div className="courseTeacher">{details.teacherInfo.name.fullName}</div>
			</div>
			<div className="bottom">
				<img
					className="teacherImg"
					src={
						details.teacherInfo.photoUrl[0] === '/'
							? 'https:' + details.teacherInfo.photoUrl
							: details.teacherInfo.photoUrl
					}
				></img>
			</div>
		</div>
	);
}
