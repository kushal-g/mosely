import React,{useEffect, useState} from "react"
import TeacherCard from "./TeacherCard"
import "./TeacherCourses.css"
import TeacherCreateCourseForm from "./TeacherCreateCourseForm"
import TeacherClassCard from "../TeacherClass/TeacherClassCard"
import TeacherCreateClass from "../TeacherClass/TeacherCreateClass"
import TeacherPanel from "../TeacherPanel/TeacherPanel"
import {PlusIcon} from 'react-line-awesome'

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
   
    return (
        <div>
        <TeacherPanel tab="courses"/>
    <div className="teacherCourses">
        {
            showForm && <TeacherCreateCourseForm offModal={()=>setShowForm(false)} fetchCourses={fetchCourses} user={props.user}/>
        }
        
     
        <div className="teacherCourses_top">
            <h2><p>Courses</p></h2>
            <button className="teacherCourses_create" onClick={()=>setShowForm(true)}><PlusIcon/> Create Courses</button>
        </div>
        <div style={{display:'flex'}}>
            <div>
                {
                    courses.map(course=>{
                        return <TeacherCard 
                        courseCoordinatorId={course.courseCoordinator} 
                        assignedTeachers={course.assignedTeachers} 
                        user={props.user} 
                        fetchCourses={fetchCourses} 
                        uniqueCourseId={course.courseId} 
                        name={course.courseName} 
                        letter={course.courseCode} 
                        description={course.courseDesc}/>
                    })
                }
            </div>
            
        </div>
     
    </div>
    </div>
    )
}

export default TeacherCourses;