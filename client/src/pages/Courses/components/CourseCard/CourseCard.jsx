import React from 'react';
import { Link } from 'react-router-dom';
import randomColor from 'randomcolor';
import './CourseCard.css';

export default function CourseCard({ details }) {
	return (
		<div className="card">
			<Link
				style={{ textDecoration: 'none' }}
				to={{ pathname: '/course/assignment', state: { course: props.details } }}
			>
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
					<div className="courseTeacher">{props.details.teacherInfo.name.fullName}</div>
				</div>
			</Link>
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
