import React, { useState } from 'react'
import TeacherLogRegister from "../Teacher/TeacherLogRegister"
import "./LandingPage.css"

function LandingPage(){

  const [tabSelected,setTabSelected]=useState("student");
  

  return (
    <div className="container center">
    <nav className="menu">
        <h1 className="menu__logo">mosely</h1>

        <div className="menu__right">
            <ul className="menu__list">
            <li className="menu__list-item"><a class={`menu__link ${tabSelected=="teacher"?"menu__link--active":""}`}  onClick={e=>setTabSelected("teacher")}>Teacher</a></li>
            <li className="menu__list-item"><a class={`menu__link ${tabSelected=="student"?"menu__link--active":""}`} onClick={e=>setTabSelected("student")}>Student</a></li>
            </ul>
        </div>
        
    </nav>
    {tabSelected=="student"?<div></div>:<TeacherLogRegister />}
</div>

);
}

export default LandingPage;