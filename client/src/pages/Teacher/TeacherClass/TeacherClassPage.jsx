import React, { useEffect, useState } from "react"
import TeacherPanel from "../TeacherPanel/TeacherPanel"
import TeacherClassCard from "./TeacherClassCard"
import TeacherCreateClass from "./TeacherCreateClass";
import {PlusIcon} from 'react-line-awesome'
function TeacherClassPage(props){


    const [showCreateClasses,setShowCreateClasses]=useState(false);
    const [classes,setClasses]=useState([]);


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
                setClasses(body.data.classes)
            })
        })
      }

      useEffect(()=>{ViewClass(props.location.state.uniqueCourseId)},[])

    return <div className="ClassPage">
    <TeacherPanel user={props.user}/>
    <div className="courseAssignment">
    <h2><p>ASSIGNMENTS</p></h2>
    <div>jhdfsdfi</div>
    </div>
    <div className="Classes">
    <div className="classButton">
    <h2><p>CLASSES</p></h2>
    <button onClick={()=>setShowCreateClasses(true)} className="teacherCard_createClass"><PlusIcon/> Create Class</button> 
    </div>        
                <div>
                    {showCreateClasses && <TeacherCreateClass ViewClass={ViewClass} offModal={()=>setShowCreateClasses(false)} user={props.user} uniqueCourseId={props.location.state.uniqueCourseId}/>}
                    {
                       classes.map(classObj=><TeacherClassCard offModal={()=>setShowCreateClasses(false)} uniqueCourseId={props.location.state.uniqueCourseId} user={props.user} ViewClass={ViewClass} letter={classObj.className} classId={classObj.classId} />)
                    }
                </div>
            
    </div>
    </div>
}

export default TeacherClassPage;
 /* {props.viewClasses(props.uniqueCourseId)}
 
            
                        viewClasses={ViewClass}
                        */