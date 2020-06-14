import React,{useState} from "react"
import TeacherCreateClass from "./TeacherCreateClass"

function TeacherClasses(props){
return <div>
   <button style={{backgroundColor:"yellow"}}>{props.Name}</button>
</div>
}

export default TeacherClasses;