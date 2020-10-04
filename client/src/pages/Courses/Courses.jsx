import React, { useContext, useEffect, useState } from 'react';
import './Courses.css';
import { AuthContext } from '../../context/Auth';
import Navbar from '../../components/Navbar/Navbar';
import CourseCard from './components/CourseCard/CourseCard';

export default function Courses() {
	const { currentUser, loading } = useContext(AuthContext);
	const [teacherCourses, setTeacherCourses] = useState([]);
	const [studentCourses, setStudentCourses] = useState([]);

	async function getCourses() {
		const token = await currentUser.getIdToken();
		const result = await fetch(`${process.env.REACT_APP_URL}/classroom/courses`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
		});

		const body = await result.json();
		setTeacherCourses(body.data.courses.teacher);
		setStudentCourses(body.data.courses.student);
		console.log(body.data);
	}

	useEffect(() => {
		getCourses();
	}, [currentUser]);

	return (
		<div>
			<Navbar teacher={teacherCourses} student={studentCourses} />
			<div className="viewCourses">
				{studentCourses.map(course => {
					return <CourseCard details={course} />;
				})}
				{teacherCourses.map(course => {
					return <CourseCard details={course} />;
				})}
			</div>
		</div>
	);
}
