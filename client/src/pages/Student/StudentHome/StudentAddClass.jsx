import React from "react"
import "./StudentAddClass.css"
import { useState } from "react";

function StudentAddClass(props){
    const [studentClassId,setStudentClassId]=useState("");

    function createStudentClass(event){
        event.preventDefault();
        props.user.getIdToken()
    .then(token=>{
        console.log(token)
        console.log(studentClassId)
        fetch(`${process.env.REACT_APP_URL}/student/class/add`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                classId:studentClassId
            })
        })
        .then(response=>response.json())
        .then(body=>{
        props.offModal()})
    }) 
    }

    return <div>
      <div className="addClass">
    <div className="addClass_background" onClick={props.offModal}></div>
    <div className="addClass_content">
    <h2><p>Add Class</p></h2>
        <form>
            <input placeholder="Class ID" onChange={event=>setStudentClassId(event.target.value)} value={studentClassId} type="text"/>
            <button type="button" onClick={createStudentClass}>Submit</button>
        </form>
    </div>    
    </div>
    </div>
}
export default StudentAddClass;