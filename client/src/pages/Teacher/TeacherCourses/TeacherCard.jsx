import React, { useState } from "react"
import "./TeacherCard.css"
import TeacherCreateCourseForm from "./TeacherCreateCourseForm"


 

function TeacherCard(props){

  const [showForm,setShowForm]=useState(false)

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
      <div className="teacherCard_letter" role="img">
        {props.letter}
      </div>
      
      <div className="teacherCard_name">
       {props.name}
      </div>
      <div className="teacherCard_desc"> 
       {props.description}
      </div>
      <button style={{backgroundColor:"black"}} onClick={DeleteCourse} className="teacherCard_delete">- Delete Course</button>
     <button style={{backgroundColor:"black"}} onClick={()=>{setShowForm(true)}} className="teacherCard_delete">Update Course</button> 
      {showForm && <TeacherCreateCourseForm  uniqueCourseId={props.uniqueCourseId} change="true" fetchCourses={props.fetchCourses} user={props.user}  offModal={()=>setShowForm(false)}  courseCode={props.letter} courseName={props.name} courseDesc={props.description} />}
    
    </div>
  
}

export default TeacherCard;