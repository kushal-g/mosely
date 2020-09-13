import React from "react"
import {Link} from "react-router-dom"
import {EyeIcon,TrashIcon} from "react-line-awesome"
import "./StudentClass.css"
import {useState} from "react"

function StudentClass(props){
  
    return <div className="studentClass" >
    <div className="studentClass_info">
      <div className="studentClass_letter" role="img">
        {props.courseCode} 
       
      </div>
      
      <div className="studentClass_name">
       {props.name}
      </div>
      <div className="studentClass_desc"> 
      <div>Course Coordinator : {props.courseCoordinator.name} </div>
      <div>Class Coordinator : {props.classCoordinator.name} </div>
      </div>
      </div>
      <div className="studentClass_buttons">
      <button className="studentClass_delete"><TrashIcon/> Delete Course</button>
     <Link style={{textDecoration:"none"}} to={{pathname:"/student/dashboard/assignment", state:{classId:props.classId,courseId:props.courseId}}} ><button className="studentClass_viewClass"><EyeIcon/> View Assignments</button></Link>
     
     </div>
     
    </div>
}
export default StudentClass;