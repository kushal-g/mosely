import React from 'react'
import { TrashIcon,EditIcon} from 'react-line-awesome'

export default function TeacherClassCard(props) {

  var randomColor=require('randomcolor');
  
    return (
        <div className="teacherClassCard" >
    <div className="teacherClassCard_info">
      <div style={{backgroundColor:randomColor({luminosity:'light'})}} className="teacherClassCard_letter">
        {props.letter}
      </div>
      
      <div className="teacherClassCard_teacher"> 
      <div>Class Coordinator : </div>
       {props.description}
      </div>
      </div>
      <div className="teacherClassCardButtons">
     <a className="edit"><EditIcon/></a>
     <a className="trash"><TrashIcon/></a>
     </div>
    </div>
    )
}
