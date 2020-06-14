import React,{useEffect, useState} from "react"
import TeacherCard from "./TeacherCard"
import "./TeacherCourses.css"
import TeacherCreateCourseForm from "./TeacherCreateCourseForm"
import TeacherClassCard from "./TeacherClassCard"
import TeacherCreateClass from "./TeacherCreateClass"


function TeacherCourses(props){

    const [courses,setCourses]=useState([])
    const [showForm,setShowForm]=useState(false)
    const [classes, setClasses] = useState([])
    const [showClasses, setShowClasses] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState("")
    const [showCreateClasses,setShowCreateClasses]=useState(false)
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

    function ViewClass(courseId){
        setClasses([])
        props.user.getIdToken()
        .then(token=>{
            console.log(token)
            fetch(`${process.env.REACT_APP_URL}/teacher/course/class/read`,{
                method:"post",
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type":"application/json"
                },
                body:JSON.stringify(
                  {
                  courseId:courseId
                  }
                )
            })
            .then(response=>response.json())
            .then(body=>{
                console.log(body)
                setShowClasses(true)
                setSelectedCourse(courseId)
                setClasses(body.data.classes)
            })
        })
      }
    
   useEffect(()=>{fetchCourses()},[])
   useEffect(()=>{ViewClass(props.uniqueCourseId)},[])
    return (
    <div className="teacherCourses">
        {
            showForm && <TeacherCreateCourseForm offModal={()=>setShowForm(false)} fetchCourses={fetchCourses} user={props.user}/>
        }
        {
            showCreateClasses && 
            <TeacherCreateClass offModal={()=>setShowCreateClasses(false)} user={props.user} uniqueCourseId={selectedCourse}
        />}
     
        <div>
            <button className="teacherCourses_create" onClick={()=>setShowForm(true)}>+ Create Courses</button>
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
                        description={course.courseDesc}
                        viewClasses={ViewClass}/>
                    })
                }
            </div>
            {
                showClasses &&
                
                <div>
                    <button onClick={()=>setShowCreateClasses(true)} className="teacherCard_createClass">+ Create Class</button>
                    {
                       classes.map(classObj=><TeacherClassCard letter={classObj.className}/>)
                    }
                </div>
            }
        </div>
     
    </div>
    )
}

export default TeacherCourses;