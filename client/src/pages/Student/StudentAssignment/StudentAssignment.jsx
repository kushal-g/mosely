import React from "react"
import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import StudentAssignmentCard from "./StudentAssignmentCard"
import "./StudentAssignment.css"

function StudentAssignment(props){
    
    const [courseAssignment,setCourseAssignment]=useState([]);
    const [classAssignment,setClassAssignment]=useState([]);

   function getAssignment(){
       
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
                setCourseAssignment(body.data.courseAssignments)
                setClassAssignment(body.data.classAssignments)
            })
        })
    }

    useEffect(()=>{getAssignment()},[]);
    
    return <div className="studentAssignment">
        <div className="assignmentHeader">
        <div><h2><p>ASSIGNMENTS FOR CLASS {props.location.state.classNames} </p></h2></div>
        <div className="goBackDiv">
        <Link to={{pathname:"/student/dashboard"}}>
            <button className="goBackBtn">
            GO BACK TO CLASSES
            </button>
        </Link>
        </div>
        </div>
       <div className="assignmentList">
        {
            courseAssignment.map(classAssign=>
                <StudentAssignmentCard 
                assignmentName={classAssign.name}
                assignmentDescription={classAssign.description}
                dueDate={classAssign.dueDate.seconds}
                assignmentLanguage={classAssign.language}
                  />)
            }
            {
                  classAssignment.map(classAssign=>
                    <StudentAssignmentCard 
                    assignmentName={classAssign.name}
                    assignmentDescription={classAssign.description}
                    dueDate={classAssign.dueDate.seconds}
                    assignmentLanguage={classAssign.language}
                      />)
        }
      </div>
    </div>
}

export default StudentAssignment;