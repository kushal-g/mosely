import React, { useContext, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import './Courses.css';
import { AuthContext } from '../../context/Auth';
import Navbar from '../../components/Navbar/Navbar';
import CourseCard from './components/CourseCard/CourseCard';

export default function Courses() {
	const { currentUser, loading } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
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
		setIsLoading(false);
		setTeacherCourses(body.data.courses.teacher);
		setStudentCourses(body.data.courses.student);
		console.log(body.data);
	}

	useEffect(() => {
		getCourses();
	}, [currentUser]);

	return (
		<div>
			<Navbar />
			<div className='viewCourses'>
				{isLoading && <Loader />}
				{studentCourses.map(course => {
					return <CourseCard details={course} label='student' />;
				})}
				{teacherCourses.map(course => {
					return <CourseCard details={course} label='teacher' />;
				})}
			</div>
		</div>
	);
}
