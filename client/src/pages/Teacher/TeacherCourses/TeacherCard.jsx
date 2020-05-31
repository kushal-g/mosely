import React, { useState } from "react"
import "./TeacherCard.css"



function TeacherCard(props){
    return <div className="teacherCard" >
      <div className="teacherCard_letter" role="img">
        {props.letter}
      </div>
      
      <div className="teacherCard_name">
       {props.name}
      </div>
      <div className="teacherCard_desc"> 
       {props.description}
      </div>
   
    </div>
  
}

export default TeacherCard;