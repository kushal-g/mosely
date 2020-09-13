import React from "react";
import {PlusIcon} from 'react-line-awesome'
import StudentClass from "./StudentClass";
import "./StudentHome.css"
import StudentAddClass from "./StudentAddClass"
import { useState,useEffect } from "react";


function StudentHome(props){

    const [showAddClass,setShowAddClass]=useState(false);
    const [classes,setClasses]=useState([]);

    function fetchStudentClasses(){
        props.user.getIdToken()
        .then(token=>{
            fetch(`${process.env.REACT_APP_URL}/student/class/read`,{
                method:"post",
                headers:{
                    "Authorization" : `Bearer ${token}`,
                    "Content-type":"application/json"
                }
            })
            .then(response=>response.json())
            .then(body=>setClasses(body.data.classes))
        })
    }
    useEffect(()=>{fetchStudentClasses()},[])
    
    return <div className="studentHomeContainer">
         <div className="studentPanel_container studentPanel_center">
            <nav className="studentPanel_menu">
                <h1 className="studentPanel_menu__logo">mosely</h1>

                <div className="studentPanel_menu__right">
                    <ul className="studentPanel_menu__list">
                    <li className="studentPanel_menu__list-item">
                        <button onClick={()=>setShowAddClass(true)} className="studentPanel_menu__link"><PlusIcon/>Add Class</button></li>
                    </ul>
                </div>
            </nav>
         </div>
       
         {showAddClass && 
                <StudentAddClass 
                offModal={()=>setShowAddClass(false)}
                user={props.user}
                fetchStudentClasses={fetchStudentClasses}
                />}
      
      <div className="registeredClass">
          <h2><p>Registered Classes </p></h2>
          <div>
              {
              classes.map(classObj=>{
                  return <StudentClass
                  name={classObj.classDetails.className}
                  courseCode={classObj.courseDetails.courseCode}
                  courseCoordinator={classObj.courseDetails.courseCoordinator}
                  classCoordinator={classObj.classDetails.classCoordinator}
                  courseId={classObj.courseDetails.id}
                  classId={classObj.classDetails.id}
                  user={props.user}
                    />
              })
              }
          </div>
      </div>
    </div>
}
export default StudentHome;