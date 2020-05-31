import React,{useState} from "react"
import "./TeacherCreateCourseForm.css"

function TeacherCreateCourseForm(props){
    const [courseId,setCourseId]=useState("")
    const [courseName,setCourseName]=useState("")
    const [courseDesc,setCourseDesc]=useState("")

    function CreateCourse(event){
        
    event.preventDefault();
        props.user.getIdToken()
    .then(token=>{
        fetch(`${process.env.REACT_APP_URL}/teacher/course`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                courseCode:courseId,
                courseName:courseName,
                courseDesc:courseDesc

            })
        })
        .then(response=>response.json())
        .then(body=>{props.fetchCourses()
        props.offModal()})
    })

}


    return <div className="courseForm">
    <div className="courseForm_background" onClick={props.offModal}></div>
    <div className="courseForm_content">
    <h2><p>Create Course</p></h2>
    <form onSubmit={CreateCourse}>
            <input placeholder="Course code" onChange={event=>setCourseId(event.target.value)} value={courseId} type="text"/>
            <input placeholder="Name" onChange={event=>setCourseName(event.target.value)} value={courseName} type="text"/>
            <input placeholder="Description" onChange={event=>setCourseDesc(event.target.value)} value={courseDesc} type="text"/>
            <button type="submit">Submit </button>
        </form>
    </div>
        
    </div>
}

export default TeacherCreateCourseForm;