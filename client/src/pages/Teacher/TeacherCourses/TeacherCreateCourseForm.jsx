import React,{useState} from "react"

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
        .then(body=>{props.fetchCourses()})
    })

}


    return <div className="courseForm">
        <form onSubmit={CreateCourse}>
            <input placeholder="CourseId" onChange={event=>setCourseId(event.target.value)} value={courseId} type="text"/>>
            <input placeholder="CourseName" onChange={event=>setCourseName(event.target.value)} value={courseName} type="text"/>
            <input placeholder="Course Description" onChange={event=>setCourseDesc(event.target.value)} value={courseDesc} type="text"/>
            <button type="submit">Submit </button>
        </form>
    </div>
}

export default TeacherCreateCourseForm;