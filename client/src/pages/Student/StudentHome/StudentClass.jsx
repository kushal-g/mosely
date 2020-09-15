import React from "react"
import {Link} from "react-router-dom"
import {EyeIcon,TrashIcon} from "react-line-awesome"
import "./StudentClass.css"

function StudentClass(props){
  var randomColor = require('randomcolor');

    return <div
    style={{ backgroundColor: randomColor({ luminosity: 'light' }) }}
    className="studentClassCard"
      >
    <div className="studentClassHead">
      {' '}
      <h2>{props.courseCode} : {props.name}</h2>
    </div>
    <div className="studentClassSubHead">
    Course Coordinator : {props.courseCoordinator.name}
      <hr></hr>
      Class Coordinator : {props.classCoordinator.name}
    </div>
    <div className="studentClassButtons">
    <button className="studentClass_delete">
    <TrashIcon/> 
    </button>
    <div className="studentClass_viewClassDiv">
    <Link style={{textDecoration:"none"}}
     to={{pathname:"/student/dashboard/assignment",
      state:{classId:props.classId,courseId:props.courseId,classNames:props.name}}} >
        <button className="studentClass_viewClass">
          <EyeIcon/> 
        </button>
    </Link>
    </div>
    </div>
  </div>
}
export default StudentClass;