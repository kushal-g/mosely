import React, { useState, useContext } from 'react'
import TeacherHome from "../TeacherHome/TeacherHome"
import TeacherReports from "../TeacherReports/TeacherReports"
import TeacherCourses from "../TeacherCourses/TeacherCourses"
import "../TeacherPanel.css"

function TeacherPanel(props){

 document.getElementsByTagName("body")[0].style.backgroundColor="white";
  
  return (

    <div className="teacherPanel_container teacherPanel_center">
    <nav className="teacherPanel_menu">
        <h1 className="teacherPanel_menu__logo">mosely</h1>

        <div className="teacherPanel_menu__right">
            <ul className="teacherPanel_menu__list">
            <li className="teacherPanel_menu__list-item"><a href="/teacher/dashboard" class={`teacherPanel_menu__link ${props.tab=="home"?"teacherPanel_menu__link--active":""}`} >Home</a></li>
            <li className="teacherPanel_menu__list-item"><a  href="/teacher/dashboard/courses" class={`teacherPanel_menu__link ${props.tab=="courses"?"teacherPanel_menu__link--active":""}`} >Courses</a></li>
            <li className="teacherPanel_menu__list-item"><a  href="/teacher/dashboard/reports" class={`teacherPanel_menu__link ${props.tab=="reports"?"teacherPanel_menu__link--active":""}`} >Reports</a></li>
            </ul>
        </div>
        
    </nav>
   
</div>

);
}

export default TeacherPanel;