import React from "react"
import {PlusIcon,TrashIcon,EditIcon,EyeIcon} from 'react-line-awesome'
import TeacherPanel from "../TeacherPanel/TeacherPanel"
import "../TeacherClass/TeacherCreateClass.css"
import TeacherClassAssignmentForm from "./TeacherClassAssignmentForm"
import { useState } from "react"

function TeacherClassAssignment(props)
{
    const [showClassAssignmentForm,setshowClassAssignmentForm]=useState(false);
    
    var className=props.location.state.className
    return <div>
    <TeacherPanel user={props.user} />
    <div className="classButton"><h2><p>ASSIGNMENTS FOR CLASS {className} </p></h2>
    <button className="teacherCard_createClass"onClick={()=>setshowClassAssignmentForm(true)} ><PlusIcon/> Create Class Assignment</button>
    {
        showClassAssignmentForm && <TeacherClassAssignmentForm user={props.user} uniqueCourseId={props.location.state.uniqueCourseId} classId={props.location.state.classId} offModal={()=>setshowClassAssignmentForm(false)}/>
    }
    </div>
    </div>
}

export default TeacherClassAssignment;