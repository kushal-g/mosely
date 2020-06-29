import React, { useState, useEffect } from "react"
import "./TeacherCreateClass.css"

function TeacherCourseAssignment(props){

    const [assignmentName,setAssignmentName]=useState("")
    const [assignmentDueDate,setAssignmentDueDate]=useState("");
    const [assignmentLanguage,setAssignmentLanguage]=useState("");
    const [assignmentDescription,setAssignmentDescription]=useState("");
    const [assignmentDocument,setAssignmentDocument]=useState("");

    function CreateCourseAssignment(event){

        event.preventDefault();
        props.user.getIdToken()
    .then(token=>{
        fetch(`${process.env.REACT_APP_URL}/teacher/course/assignment`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                attachment:assignmentDocument,
                courseId:props.uniqueCourseId,
                name:assignmentName,
                dueDate:assignmentDueDate,
                description:assignmentDescription,
                language:assignmentLanguage,
                
            })
        })
        .then(response=>response.json())
        .then(body => {console.log(body);
        props.offModal();
          })
    }) 

}


    return <div className="classForm">
    <div className="classForm_background" onClick={props.offModal}></div>
    <div className="classForm_content">
    <h2>
    <p>Create Course Assignment</p></h2>
    <form onSubmit={CreateCourseAssignment}>
            <input placeholder="Assignment Name" onChange={event=>setAssignmentName(event.target.value)} value={assignmentName} type="text"/>
            <input placeholder="Assignment Language" onChange={event=>setAssignmentLanguage(event.target.value)} value={assignmentLanguage} type="text"/>
            <input placeholder="Assignment Due Date" onChange={event=>setAssignmentDueDate(event.target.value)} value={assignmentDueDate} type="text"/>
            <input placeholder="Assignment Description" onChange={event=>setAssignmentDescription(event.target.value)} value={assignmentDescription} type="text"/>
            <input placeholder="Assignment Document" onChange={event=>setAssignmentDocument(event.target.value)} value={assignmentDocument} type="text"/>
            <button type="Submit"> Submit</button>
        </form>
    </div>
        
    </div>
    
}

export default TeacherCourseAssignment;