import React from 'react';
import { HomeIcon } from 'react-line-awesome';
import './Sidebar.css';
import SidebarElements from './SidebarElements';

export default function Sidebar(props) {
	return (
		<aside className={props.open ? 'sidebar-active' : ''}>
			<a href="/courses" className="allCourses">
				<div className="home">
					<HomeIcon />
				</div>
				Classes
			</a>
			{props.teacher.length > 0 && (
				<div>
					<div className="sideHead">Teaching</div>
					<div>
						{props.teacher.map(course => {
							return <SidebarElements details={course} />;
						})}
					</div>
				</div>
			)}
			{props.student.length > 0 && (
				<div>
					<div className="sideHead">Enrolled</div>
					<div>
						{props.student.map(course => {
							return <SidebarElements details={course} />;
						})}
					</div>
				</div>
			)}
		</aside>
	);
}
