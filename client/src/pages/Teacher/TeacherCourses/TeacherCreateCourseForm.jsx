import React,{useState} from "react"
import "./TeacherCreateCourseForm.css"

function TeacherCreateCourseForm(props){
    const [courseId,setCourseId]=useState(props.courseCode)
    const [courseName,setCourseName]=useState(props.courseName)
    const [courseDesc,setCourseDesc]=useState(props.courseDesc)


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

function UpdateCourse(event){
      
    event.preventDefault();
        props.user.getIdToken()
    .then(token=>{
        fetch(`${process.env.REACT_APP_URL}/teacher/course/update`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                courseId: props.uniqueCourseId ,
                courseCode:courseId,
                courseName: courseName,
                courseDesc: courseDesc,
  
            })
        })
        .then(response=>response.json())
        .then(body=>{props.fetchCourses()})
    })
  
  }


    return <div className="courseForm">
    <div className="courseForm_background" onClick={props.offModal}></div>
    <div className="courseForm_content">
    <h2>{!props.change && <p>Create Course</p>}
        {props.change && <p>Edit Course</p>} </h2>
    <form onSubmit={CreateCourse}>
            <input placeholder="Course code" onChange={event=>setCourseId(event.target.value)} value={courseId} type="text"/>
            <input placeholder="Name" onChange={event=>setCourseName(event.target.value)} value={courseName} type="text"/>
            <input placeholder="Description" onChange={event=>setCourseDesc(event.target.value)} value={courseDesc} type="text"/>
           {!props.change && <button type="submit">Submit </button> } 
           {props.change && <button onClick={UpdateCourse} type="button">Edit</button>}
        </form>
    </div>
        
    </div>
}

export default TeacherCreateCourseForm;