import React from "react"
import "./StudentAssignment.css"
function StudentAssignmentCard(props){
    var randomColor = require('randomcolor');
    return <div
    style={{ backgroundColor: randomColor({ luminosity: 'light' }) }}
    className="assignmentCard"
>
    <div className="assignmentHead">
        {' '}
        <h2>{props.assignmentName}</h2>
    </div>
    <div className="assignmentSubHead">
       <textarea value={props.assignmentDescription}></textarea>
        <hr></hr>
        <div>{props.dueDate}</div>
        <div>{props.assignmentLanguage}</div>
        <button type="button">View Files</button>
        <button type="button">Upload Assignment</button>
        <button type="submit">Submit</button>
    </div>
</div>
}
export default StudentAssignmentCard;