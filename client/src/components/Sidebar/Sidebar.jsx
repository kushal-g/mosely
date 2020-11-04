import React, { useState } from 'react';
import { useEffect } from 'react';
import { HomeIcon } from 'react-line-awesome';
import './Sidebar.css';
import SidebarElements from './components/SidebarElement/SidebarElements';

export default function Sidebar(props) {
	const [teachingCourses, setTeachingCourses] = useState([]);
	const [enrolledCourses, setEnrolledCourses] = useState([]);

	async function getCourses() {
		const token = await props.currentUser.getIdToken();

		const result = await fetch(`${process.env.REACT_APP_URL}/classroom/courses`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
		});

		const body = await result.json();
		setTeachingCourses(body.data?.courses?.teacher ?? []);
		setEnrolledCourses(body.data?.courses?.student ?? []);
	}

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<aside className={props.open ? 'sidebar-active' : ''}>
			<a href='/courses' className='allCourses'>
				<div className='home'>
					<HomeIcon />
				</div>
				Classes
			</a>
			{teachingCourses.length > 0 && (
				<div>
					<div className='sideHead'>Teaching</div>
					<div>
						{teachingCourses.map(course => {
							return <SidebarElements details={course} />;
						})}
					</div>
				</div>
			)}
			{enrolledCourses.length > 0 && (
				<div>
					<div className='sideHead'>Enrolled</div>
					<div>
						{enrolledCourses.map(course => {
							return <SidebarElements details={course} />;
						})}
					</div>
				</div>
			)}
		</aside>
	);
}
