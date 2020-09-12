import React from "react";
import "./AddTeacher.css";

function AddTeacher(props){
    function ConfirmAddTeacher(){
       
        props.user.getIdToken()
    .then(token=>{
        fetch(`${process.env.REACT_APP_URL}/teacher/course/teachers/add`,{
            method:"post",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                courseId:props.uniqueCourseId,
                teacherId:"hfiduh",
            })
        })
        .then(response=>response.json())
        .then(body => {
            console.log(body);
        props.offModal();
        })
    }) 

}
return <div className="AddTeacherForm">
    <div className="AddTeacherForm_background" onClick={props.offModal}></div>
    <div className="AddTeacherForm_content">
    {console.log("entered")}
    <h3>Confirm Add Teacher</h3>
    <button className="confirmYes" onClick={ConfirmAddTeacher}>YES</button>
    <button className="confirmNo" onClick={props.offModal}>NO</button>
    </div>
    </div>

}

export default AddTeacher;