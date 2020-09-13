import React from "react"
import {useState,useEffect} from "react"
import StudentAssignmentCard from "./StudentAssignmentCard"

function StudentAssignment(props){
    
    const [assignment,setAssignment]=useState([])

   function getAssignment(event){
       event.preventDefault()
        props.user.getIdToken()
        .then(token=>{
            console.log(props.location.state.classId)
            fetch(`${process.env.REACT_APP_URL}/student/class/assignments/read`,{
                method:"post",
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type":"application/json"
                },
                body:JSON.stringify(
                  {
                  courseId:props.location.state.courseId,
                  classId:props.location.state.classId
                  }
                )
            })
            .then(response=>response.json())
            .then(body=>{
                console.log(body)
                setAssignment(body.data)
            })
        })
    }

   // useEffect(()=>{getAssignment()},[]);
    
    return <div>
        <h2><p>ASSIGNMENTS FOR CLASS {props.location.state.classId} </p></h2>
        <button onClick={getAssignment}>do</button>
        {
       //assignment.map(assignObj=><StudentAssignmentCard name={assignObj.courseId}/>)
        }
</div>
}

export default StudentAssignment;