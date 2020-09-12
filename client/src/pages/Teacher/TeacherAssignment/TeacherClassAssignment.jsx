import React,{useEffect} from "react"
import {PlusIcon,TrashIcon,EditIcon,EyeIcon} from 'react-line-awesome'
import TeacherPanel from "../TeacherPanel/TeacherPanel"
import "../TeacherClass/TeacherCreateClass.css"
import TeacherClassAssignmentForm from "./TeacherClassAssignmentForm"
import TeacherClassAssignmentCard from "./TeacherClassAssignmentCard"
import { useState } from "react"

function TeacherClassAssignment(props)
{
    const [showClassAssignmentForm,setshowClassAssignmentForm]=useState(false);
    const [classAssignment,setClassAssignment]=useState([]);
    var className=props.location.state.className

    function ViewClassAssignment(){
        setClassAssignment([])
        props.user.getIdToken()
        .then(token=>{
            console.log(token)
            fetch(`${process.env.REACT_APP_URL}/teacher/course/class/assignment/read`,{
                method:"post",
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type":"application/json"
                },
                body:JSON.stringify(
                  {
                  courseId:props.location.state.uniqueCourseId,
                  classId:props.location.state.classId
                  }
                )
            })
            .then(response=>response.json())
            .then(body=>{
                console.log(body.data)
                setClassAssignment(body.data.classAssignments)
            })
        })
    }
    useEffect(()=>{ViewClassAssignment()},[]);

   
    return <div>
    <TeacherPanel user={props.user} />
    <div className="classButton"><h2><p>ASSIGNMENTS FOR CLASS {className} </p></h2>
    <button className="teacherCard_createClass"onClick={()=>setshowClassAssignmentForm(true)} ><PlusIcon/> Create Class Assignment</button>
    </div>
    <div className="assignments">
    {
        showClassAssignmentForm && <TeacherClassAssignmentForm user={props.user} ViewClassAssignment={ViewClassAssignment} uniqueCourseId={props.location.state.uniqueCourseId} classId={props.location.state.classId} offModal={()=>setshowClassAssignmentForm(false)}/>
    }
    {
        classAssignment.map(classAssignObj=><TeacherClassAssignmentCard user={props.user} classId={props.location.state.classId} assignmentDescription={classAssignObj.description} ViewClassAssignment={ViewClassAssignment} uniqueCourseId={props.location.state.uniqueCourseId} assignmentId={classAssignObj.assignmentId} assignmentLanguage={classAssignObj.language} assignmentName={classAssignObj.name} dueDate={classAssignObj.dueDate.seconds}/>)
    }
    </div>
    </div>
}

export default TeacherClassAssignment;