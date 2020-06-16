import React from 'react'

export default function TeacherClassCard(props) {
    return (
        <div className="teacherCard" >
    <div className="teacherCard_info">
      <div className="teacherCard_letter" role="img">
        {props.letter}
      </div>
      
      <div className="teacherCard_name">
       {props.name}
      </div>
      <div className="teacherCard_desc"> 
      <div>Class Coordinator : </div>
       {props.description}
      </div>
      </div>
      
     
    </div>
    )
}
