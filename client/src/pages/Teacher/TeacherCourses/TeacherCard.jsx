import React, { useState } from "react"
import "./TeacherCard.css"
import TeacherCreateCourseForm from "./TeacherCreateCourseForm"
import TeacherCreateClass from "./TeacherCreateClass"
import TeacherClasses from "./TeacherClasses"

 

function TeacherCard(props){

  const [showForm,setShowForm]=useState(false)
  const [showClasses,setShowClasses]=useState(false)
  const [classes,setClasses]=useState([])
  const [showCreateClasses,setShowCreateClasses]=useState(false)

  function DeleteCourse(){
         
        props.user.getIdToken()
    .then(token=>{
        fetch(`${process.env.REACT_APP_URL}/teacher/course/delete`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                courseId:props.uniqueCourseId
  
            })
        })
        .then(response=>response.json())
        .then(body=>{props.fetchCourses()})
    })
  
  }
    return <div className="teacherCard" >
    <div className="teacherCard_info">
      <div className="teacherCard_letter" role="img">
        {props.letter}
      </div>
      
      <div className="teacherCard_name">
       {props.name}
      </div>
      <div className="teacherCard_desc"> 
      <div>Course Coordinator : {props.assignedTeachers?.filter(teacher=> teacher.uid==props.courseCoordinatorId)[0].name}</div>
       {props.description}
      </div>
      </div>
      <div className="teacherCard_buttons">
      <button  onClick={DeleteCourse} className="teacherCard_delete">- Delete Course</button>
     <button  onClick={()=>{setShowForm(true)}} className="teacherCard_update">Update Course Details</button> 
      {showForm && <TeacherCreateCourseForm  uniqueCourseId={props.uniqueCourseId} change="true" fetchCourses={props.fetchCourses} user={props.user}  offModal={()=>setShowForm(false)}  courseCode={props.letter} courseName={props.name} courseDesc={props.description} />}
     <button onClick={()=>{props.viewClasses(props.uniqueCourseId)}} className="teacherCard_viewClass">View Classes</button>
    
     
     </div>
     
    </div>

  
}

export default TeacherCard;