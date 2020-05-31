import React,{useEffect, useState} from "react"
import TeacherCard from "./TeacherCard"
import TeacherCreateCourseForm from "./TeacherCreateCourseForm"


function TeacherCourses(props){

    const [courses,setCourses]=useState([])
    const [showForm,setShowForm]=useState(false)


    function fetchCourses(){
        props.user.getIdToken()
        .then(token=>{
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
    return <div className="teacherHome_classes_courses">
    {
        showForm && <TeacherCreateCourseForm fetchCourses={fetchCourses} user={props.user}/>
    }
    <div>
        <button style={{backgroundColor:"black"}} onClick={()=>setShowForm(true)}>+ Create Courses</button>
    </div>
     <div className="teacherHome_courses">
       {
           courses.map(course=>{
               return <TeacherCard name={course.courseName} id={course.courseCode} description={course.courseDesc}/>
           })
       }
     </div>

    </div>
}

export default TeacherCourses;