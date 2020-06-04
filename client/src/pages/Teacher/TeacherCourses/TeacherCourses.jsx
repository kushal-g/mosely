import React,{useEffect, useState} from "react"
import TeacherCard from "./TeacherCard"
import "./TeacherCourses.css"
import TeacherCreateCourseForm from "./TeacherCreateCourseForm"


function TeacherCourses(props){

    const [courses,setCourses]=useState([])
    const [showForm,setShowForm]=useState(false)


    function fetchCourses(){
        props.user.getIdToken()
        .then(token=>{
            console.log(token)
            fetch(`${process.env.REACT_APP_URL}/teacher/course/read`,{
                method:"post",
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type":"application/json"
                }
            })
            .then(response=>response.json())
            .then(body=>setCourses(body.data.courses))
        })
    }

    
useEffect(()=>{fetchCourses()},[])
    return <div className="teacherCourses">
    {
        showForm && <TeacherCreateCourseForm offModal={()=>setShowForm(false)} fetchCourses={fetchCourses} user={props.user}/>
    }
   <div>
        <button className="teacherCourses_create" onClick={()=>setShowForm(true)}>+ Create Courses</button>
    </div>
    
     <div>
       {
           courses.map(course=>{
               return <TeacherCard name={course.courseName} letter={course.courseCode} description={course.courseDesc}/>
           })
       }
     </div>

    </div>
}

export default TeacherCourses;