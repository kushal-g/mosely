import React from 'react';
import {TrashIcon,EyeIcon,EditIcon} from "react-line-awesome"
import './StudentAssignmentCard.css';
function StudentAssignmentCard(props) {
	var randomColor = require('randomcolor');
	
	return (
	<div className="topLevel">
		<div className="assignmentCard"
		style={{ backgroundColor: randomColor({ luminosity: 'light' }) }} >
			<div className="assignmentCard_info">
					<div className="assignmentCard_letter" role="img">
						{props.assignmentLanguage} 
					</div>
			
					<div className="assignmentCard_name">
					{props.name}
					</div>
					<div className="assignmentCard_desc"> 
					{props.dueDate}
					{props.assignmentDescription}
					</div>
			</div>
		<div className="assignmentCard_buttons">
		<button className="assignmentCard_delete"><TrashIcon/> View Document</button>
		<button className="assignmentCard_viewClass"><EyeIcon/> Upload Files</button> 
		<button  className="assignmentCard_update"><EditIcon/> Submit </button> 
		</div>
		</div>
    </div>
	);
}
export default StudentAssignmentCard;
