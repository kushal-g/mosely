import React,{useEffect} from "react"
import TeacherCard from "./TeacherCard"


function TeacherCourses(props){

    useEffect(()=>{
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
        .then(body=>console.log(body))
    })
    },[])
    return <div className="teacherHome_classes_courses">
     <div className="teacherHome_courses">
       <TeacherCard letter="s" courseId="11005" description="subject name" />
       <TeacherCard letter="t" courseId="11006" description="subject name" />
       <TeacherCard letter="u" courseId="11007" description="subject name" />
     </div>
    </div>
}

export default TeacherCourses;