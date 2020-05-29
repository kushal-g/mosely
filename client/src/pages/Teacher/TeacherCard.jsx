import React, { useState } from "react"
import "./TeacherPanel.css"



function TeacherCard(props){
    return <div className="teacherCard">
      <span className="teacherCard_letter" role="img">
        {props.name}
      </span>
      <div className="teacherCard_info">
      {props.courseCoordinator}
      <dt>
      <button className="teacherCard_info_heading" ></button>
    </dt>
    <dd>{props.description}</dd>
    </div>
  </div>
}

export default TeacherCard;