import React, { useState } from 'react'
import { TrashIcon,EditIcon} from 'react-line-awesome'
import TeacherCreateClass from './TeacherCreateClass';

export default function TeacherClassCard(props) {

  const [showForm,setShowForm]=useState(false);
  var randomColor=require('randomcolor');



  function DeleteClass(){
        
    props.user.getIdToken()
.then(token=>{
    fetch(`${process.env.REACT_APP_URL}/teacher/course/class/delete`,{
        method:"post",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type":"application/json"
        },
        body:JSON.stringify({
         
            courseId:props.uniqueCourseId, 
            classId:props.classId
           
        })
    })
    .then(response=>response.json())
    .then(body=>{console.log(body);
    props.ViewClass(props.uniqueCourseId)})
})

}

  
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
     <a className="edit" onClick={()=>setShowForm(true)}><EditIcon/></a>
     {showForm && <TeacherCreateClass offModal={props.offModal()} ViewClass={props.ViewClass} uniqueCourseId={props.uniqueCourseId} changed="true" user={props.user}   classId={props.classId} className={props.letter} />}
     <a className="trash" onClick={DeleteClass}><TrashIcon/></a>
     </div>
    </div>
    )
}
