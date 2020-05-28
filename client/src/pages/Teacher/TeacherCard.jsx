import React, { useState } from "react"
import "./TeacherPanel.css"


function ClassInCourse(){
 return <div>
     <button>
        + Create Class
     </button>
     <button>
        + Create Course Level Assignment
     </button>
     <TeacherCard letter="c" courseId="11005" description="subject name" />
       <TeacherCard letter="d" courseId="11006" description="subject name" />
       <TeacherCard letter="e" courseId="11007" description="subject name" />
 </div>
}

function TeacherCard(props){
    return <div className="teacherCard">
      <span className="teacherCard_letter" role="img">
        {props.letter}
      </span>
      <div className="teacherCard_info">
      <dt>
      <button className="teacherCard_info_heading" >{props.courseId}</button>
    </dt>
    <dd>{props.description}</dd>
    </div>
  </div>
}

export default TeacherCard;