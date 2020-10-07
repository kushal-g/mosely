import React from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from '../../../../Hooks/useLocalStorage';
import randomColor from 'randomcolor';
import './CourseCard.css';

export default function CourseCard({ details }) {
	const [cardColor, setCardColor] = useLocalStorage(
		details.id,
		randomColor({
			luminosity: 'dark',
			format: 'rgba',
			alpha: 0.75,
		})
	);

	return (
		<div className="card">
			<Link
				style={{ textDecoration: 'none' }}
				to={{ pathname: `/course/assignment/${details.id}`, state: { course: details } }}
			>
				<div
					style={{
						backgroundColor: cardColor,
					}}
					className="top"
				>
					<div className="courseName">{details.name}</div>
					<div className="courseSection">{details.section ? details.section : ' '}</div>
					<div className="courseTeacher">{details.teacherInfo.name.fullName}</div>
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
