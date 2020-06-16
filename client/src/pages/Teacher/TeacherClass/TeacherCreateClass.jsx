import React, { useState, useEffect } from "react"
import "./TeacherCreateClass.css"

function TeacherCreateClass(props){

    const [className,setClassName]=useState("")

    function CreateClass(event){

        event.preventDefault();
        props.user.getIdToken()
    .then(token=>{
        fetch(`${process.env.REACT_APP_URL}/teacher/course/class`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                className:className,
                courseId:props.uniqueCourseId
            })
        })
        .then(response=>response.json())
        .then(body => {console.log(body);
        props.offModal();
           props.ViewClass(props.uniqueCourseId)})
    }) 

}


    return <div className="classForm">
    <div className="classForm_background" onClick={props.offModal}></div>
    <div className="classForm_content">
    <h2><p>Create Class</p> </h2>
    <form onSubmit={CreateClass}>
            <input placeholder="Class Name" onChange={event=>setClassName(event.target.value)} value={className} type="text"/>
           <button type="Submit">Submit</button>
        </form>
    </div>
        
    </div>
    
}

export default TeacherCreateClass;