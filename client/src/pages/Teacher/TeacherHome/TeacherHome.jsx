import React from "react"
import TeacherCard from "../TeacherCourses/TeacherCard"
import "../TeacherPanel.css"
function TeacherHome() {
  return <div className="teacherHome_container">
    <div className="teacherHome_colorBox">
      <p className="teacherHome_colorBox-text">Welcome Back to the portal ,please complete the tasks</p>
    </div>
    <div className="teacherHome_material">
      <div className="teacherHome_classes_courses">
        <div className="teacherHome_courses">
          <h2><p>Courses</p></h2>
          <TeacherCard letter="s" name="11005" description="subject name" />
          <TeacherCard letter="t" name="11006" description="subject name" />
          <TeacherCard letter="u" name="11007" description="subject name" />
        </div>
      </div>
      <div className="teacherHome_deadlines">
      <h2><p>Upcoming Deadlines</p></h2>
        <div className="teacherHome_deadlines_content">
          <TeacherCard letter="s" name="11005" description="subject name" />
          <TeacherCard letter="s" name="11005" description="subject name" />
          <TeacherCard letter="s" name="11005" description="subject name" />
          <TeacherCard letter="s" name="11005" description="subject name" />
        </div>
      </div>

      <div className="teacherHome_classes_courses">
        <div className="teacherHome_classes">
        <h2><p>Classes</p></h2>
          <TeacherCard letter="s" name="11005" description="subject name" />
          <TeacherCard letter="t" name="11006" description="subject name" />
          <TeacherCard letter="u" name="11007" description="subject name" />
        </div>
      </div>
      
    </div>
  </div>
}

export default TeacherHome;