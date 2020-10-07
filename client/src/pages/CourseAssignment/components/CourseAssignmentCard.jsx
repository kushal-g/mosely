import React from 'react';
import { QuestionCircleIcon } from 'react-line-awesome';
import './CourseAssignmentCard.css';

export default function CourseAssignmentCard(props) {
	const monthExist = props.assignment.dueDate ? props.assignment.dueDate : 0;
	var mon;
	switch (monthExist.month) {
		case 1:
			mon = 'Jan';
			break;
		case 2:
			mon = 'Feb';
			break;
		case 3:
			mon = 'Mar';
			break;
		case 4:
			mon = 'Apr';
			break;
		case 5:
			mon = 'May';
			break;
		case 6:
			mon = 'Jun';
			break;
		case 7:
			mon = 'Jul';
			break;
		case 8:
			mon = 'Aug';
			break;

		case 9:
			mon = 'Sept';
			break;
		case 10:
			mon = 'Oct';
			break;
		case 11:
			mon = 'Nov';
			break;
		case 12:
			mon = 'Dec';
			break;
		default:
			mon = '';
	}
	return (
		<div className="courseAssignmentCard">
			<div className="icon">
				<QuestionCircleIcon />
			</div>
			<div className="assignmentDetails">
				<div className="assignmentDesc">{props.assignment.title}</div>
				{props.assignment.dueDate && (
					<span className="assignmentDueDate">
						{mon} {monthExist.day ? monthExist.day : ''}
					</span>
				)}
			</div>
		</div>
	);
}
