import React from "react"
import TeacherCard from "../TeacherCourses/TeacherCard"
import "../TeacherPanel.css"
function TeacherHome(){
    return <div className="teacherHome_container">
       <div className="teacherHome_colorBox">
    <p className="teacherHome_colorBox-text">Welcome Back to the portal ,please complete the tasks</p>
    </div>
    <div className="teacherHome_material">
    <div className="teacherHome_classes_courses">
     <div className="teacherHome_courses">
       <TeacherCard letter="s" courseId="11005" description="subject name" />
       <TeacherCard letter="t" courseId="11006" description="subject name" />
       <TeacherCard letter="u" courseId="11007" description="subject name" />
     </div>
     </div>
     <div className="teacherHome_deadlines">
     <ul>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
         <li>1</li>
     </ul>
    </div>
     
     <div className="teacherHome_classes_courses">
     <div className="teacherHome_classes">
       <TeacherCard letter="s" courseId="11005" description="subject name" />
       <TeacherCard letter="t" courseId="11006" description="subject name" />
       <TeacherCard letter="u" courseId="11007" description="subject name" />
     </div>
    </div>
    
    </div>
    </div>
}

export default TeacherHome;