import React, { useState, useContext } from 'react'
import TeacherHome from "../TeacherHome/TeacherHome"
import TeacherReports from "../TeacherReports/TeacherReports"
import TeacherCourses from "../TeacherCourses/TeacherCourses"
import "../TeacherPanel.css"

function TeacherPanel(props){

 document.getElementsByTagName("body")[0].style.backgroundColor="white";
  const [tabSelected,setTabSelected]=useState("home");
  
  return (

    <div className="teacherPanel_container teacherPanel_center">
    <nav className="teacherPanel_menu">
        <h1 className="teacherPanel_menu__logo">mosely</h1>

        <div className="teacherPanel_menu__right">
            <ul className="teacherPanel_menu__list">
            <li className="teacherPanel_menu__list-item"><a class={`teacherPanel_menu__link ${tabSelected=="home"?"teacherPanel_menu__link--active":""}`}  onClick={e=>setTabSelected("home")}>Home</a></li>
            <li className="teacherPanel_menu__list-item"><a class={`teacherPanel_menu__link ${tabSelected=="courses"?"teacherPanel_menu__link--active":""}`} onClick={e=>setTabSelected("courses")}>Courses</a></li>
            <li className="teacherPanel_menu__list-item"><a class={`teacherPanel_menu__link ${tabSelected=="reports"?"teacherPanel_menu__link--active":""}`} onClick={e=>setTabSelected("reports")}>Reports</a></li>
            </ul>
        </div>
        
    </nav>
    {tabSelected=="home"?<TeacherHome />:(tabSelected=="courses")?<TeacherCourses user={props.user} />:<TeacherReports/>}
</div>

);
}

export default TeacherPanel;